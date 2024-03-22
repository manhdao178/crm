import React from 'react';
import { makeStyles } from '@mui/styles';
import { Tab } from '@mui/material';
import { Box } from '@mui/system';
import { useFormikContext } from 'formik';
import { cloneDeep } from 'lodash';
import EachBranchOfProject from './EachBranchOfProject';
import { showError } from 'helpers/toast';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  tab: {
    border: 'solid 1px #C6CCD3 !important',
    borderBottom: '0 !important',
    borderTopLeftRadius: '8px !important',
    borderTopRightRadius: '8px !important',
    marginBottom: '-10px !important',
    paddingTop: '2px !important',
  },
  isActive: {
    border: '0 !important',
    backgroundColor: `#99FF00 !important`,
    color: `${theme.custom.colors.white} !important`,
  },
}));

const EachProjects = ({ item, index }) => {
  //! State
  const classes = useStyles();
  const formik = useFormikContext();
  const { t } = useTranslation();
  const { projectSelecting } = formik?.values;
  const isTabActive = projectSelecting === item.value;

  //! Function
  const handleClickProject = (value) => {
    const newProject = cloneDeep(formik?.values?.projects);
    const projectSelectingObj = newProject?.find((item) => item?.value === formik?.values?.projectSelecting);
    // if (projectSelectingObj?.branches?.length === 0) {
    //   showError(t('common:userlist_errorSelectBranch'));
    //   return;
    // }
    const projectFound = newProject?.find((item) => item?.value === value);

    // if (projectFound) {
    //   if (projectFound.isOwned === false) {
    //     projectFound.isOwned = true;
    //   }
    // }

    formik.setFieldValue('projectSelecting', projectFound.value);
    formik.setFieldValue('projects', newProject);
  };

  //! Render
  return (
    <Box>
      <Tab
        className={classNames(classes.tab, { [classes.isActive]: isTabActive })}
        label={item.label}
        onClick={() => handleClickProject(item.value)}
      >
        {item.value}
      </Tab>

      {projectSelecting === item.value && <EachBranchOfProject indexProject={index} project={item} />}
    </Box>
  );
};

export default EachProjects;
