import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Grid } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import CustomField from 'components/CustomField';
import httpServices from 'services/httpServices';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';

const useStyles = makeStyles((theme) => {
  return {
    filterContainer: {
      padding: '20px',
    },
  };
});

const Filters = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const project = httpServices.getServiceStorage();
  const { data: branchOption, refetch: refetchBranch } = useGetBranchOptions({
    project: project,
  });
  const branchOptions = branchOption?.data?.data || [];
  const branchOptionsConvert = [{ value: 'all', label: 'Tất cả' }].concat(branchOptions);

  const { values } = useFormikContext();

  //! Function

  //! Render
  return (
    <div className={classes.filterContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} md key="from">
          <Field
            LabelColorPrimary
            maxDate={values.to || new Date()}
            label={t('common:from')}
            name="from"
            component={CustomField.DateField}
          />
          {/* <CustomField.DateField LabelColorPrimary label={t('common:from')} /> */}
        </Grid>
        <Grid item xs={12} md key="to">
          <Field
            LabelColorPrimary
            minDate={values.from || moment().startOf('month').toISOString()}
            label={t('common:to')}
            name="to"
            component={CustomField.DateField}
          />
          {/* <CustomField.DateField LabelColorPrimary label={t('common:to')} /> */}
        </Grid>
        <Grid item xs={12} md key="branch">
          <Field
            component={CustomField.SelectField}
            name="branch"
            options={branchOptionsConvert}
            LabelColorPrimary
            label={t('common:branch')}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Filters;
