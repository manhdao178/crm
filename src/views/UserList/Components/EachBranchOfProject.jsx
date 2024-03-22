import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import { Field, useFormikContext } from 'formik';
import SelectField from 'components/CustomField/SelectField';
import { useMemo } from 'react';
import { isArray, isEmpty, isString } from 'lodash';
import { useCallback } from 'react';
import { cloneDeep } from 'lodash';

const useStyles = makeStyles((theme) => {
  return {
    branchSelect: {
      position: 'absolute',
      width: '100%',
      left: '0',
    },
  };
});

const EachBranchOfProject = ({ project = {}, indexProject = 0 }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const idProject = project?.value;
  const { values, setFieldValue } = useFormikContext();
  const formik = useFormikContext();
  const { values: formikValues } = formik;

  const selectedbranch = values?.projects?.[indexProject]?.branches;

  const nameBranch = `projects.[${indexProject}].branches`;
  const { data: branchList, isLoading: isLoadingbranchList } = useGetBranchOptions(
    {
      project: idProject,
    },
    { enabled: !!idProject },
  );

  const brandOptions = useMemo(() => {
    const branchListConvert = branchList?.data?.data || [];
    const allValues = { label: 'Tất cả', value: branchListConvert.map((elm) => elm.value) };
    const cloneSelectedBranch = cloneDeep(selectedbranch);
    if (cloneSelectedBranch.some((elm) => elm.label === 'Tất cả')) return [];
    if (cloneSelectedBranch.length === 0) return [allValues, ...branchListConvert];
    return (
      branchListConvert.filter((elm) => {
        const index = cloneSelectedBranch?.findIndex((item) => item?.value === elm?.value);
        return index === -1;
      }) || []
    );
  }, [branchList, values]);

  const parsedValue = useMemo(() => {
    const branchesOfProject = project?.branches || [];
    return branchesOfProject
      .map((itemString) => {
        if (isString(itemString)) {
          const brandFound = brandOptions.find((item) => item.value === itemString);
          if (brandFound) {
            return brandFound;
          }

          return '';
        }

        return itemString;
      })
      .filter((el) => !!el);
  }, [project, brandOptions]);

  //! Function
  const handleAfterOnChange = useCallback(
    (branches) => {
      const newProject = cloneDeep(formik?.values?.projects);
      const projectFound = newProject?.find((item) => item?.value === project.value);
      if (projectFound) {
        if (projectFound.isOwned === false) {
          projectFound.isOwned = true;
        }
        if (isArray(branches) && isEmpty(branches) && projectFound.isOwned) {
          projectFound.isOwned = false;
        }
      }

      formik.setFieldValue('projectSelecting', projectFound.value);
      formik.setFieldValue('projects', newProject);
    },
    [formikValues],
  );

  //! Render
  return (
    <div className={classes.branchSelect}>
      <Field
        component={SelectField}
        isMultiple
        placeholder={t('common:userlist_selectBranch')}
        name={nameBranch}
        afterOnChange={handleAfterOnChange}
        value={parsedValue}
        options={brandOptions}
        isLoading={isLoadingbranchList}
      />
    </div>
  );
};

export default EachBranchOfProject;
