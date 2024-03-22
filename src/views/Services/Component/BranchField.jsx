import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, useFormikContext } from 'formik';
import SelectField from 'components/CustomField/SelectField';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import CustomField from 'components/CustomField';

const useStyles = makeStyles((theme) => {
  return {};
});

const BranchField = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { values } = useFormikContext();
  const selectedBranch = values?.branches;

  const { data: resListBranch } = useGetBranchOptions('');

  //! Function
  const branchOptions = () => {
    const branchOptionsConvert = resListBranch?.data?.data?.map((item) => ({ ...item, id: item.data._id })) || [];
    // const allValues = { label: 'Tất cả', value: branchOptionsConvert.map((elm) => elm.value), id: '1' };
    // if (selectedBranch?.some((elm) => elm.label === 'Tất cả')) return [];
    // if (selectedBranch?.length === 0) return [allValues, ...branchOptionsConvert];
    return (
      branchOptionsConvert.filter((elm) => {
        const index = selectedBranch?.findIndex((item) => item?.value === elm?.value);
        return index === -1;
      }) || []
    );
  };

  //! Render
  return (
    <Field
      disabled={values.allBranch}
      isMultiple
      name="branches"
      options={branchOptions()}
      component={SelectField}
      renderOption
    />
  );
};

export default BranchField;
