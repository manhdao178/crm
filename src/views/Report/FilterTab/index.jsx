import { Grid, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CommonIcons from 'components/CommonIcons';
import CustomField from 'components/CustomField';
import BranchServiceReception from 'components/LayoutReceptionist/components/BranchServiceReception';
import { roles } from 'constants';
import { Field, useFormikContext } from 'formik';
import { loadOptionsLineAsync } from 'helpers/loadOptionsAsync';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import { useGetOptions } from 'hooks/options/userGetOptions';
import { useGetReceptions } from 'hooks/receptions/useGetReceptions';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import httpServices from 'services/httpServices';

const useStyles = makeStyles((theme) => {
  return {
    filterContainer: {
      marginTop: 20,
      display: 'flex',
      gap: '20px',
      '& > div': {
        flex: 1,
      },
    },
    deleteSelect: {
      '& .icon': {
        fontSize: '15px',
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
  };
});

const FilterTab = (props) => {
  //! Define
  const { filters, roleUser } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const user = httpServices.getUserInfoStorage();
  const userRole = user?.userRoleDetail?.key;
  const checkUserRole = () => {
    if (filters?.status === 'team') {
      if (roleUser === roles.TELESALE_LEAD) {
        return roles.TELESALE;
      }
      if (roleUser === roles.PAGE_LEAD) {
        return roles.FANPAGE;
      }
    }
    return userRole;
  };

  const [stateService, setStateService] = useState();
  const [stateBranch, setStateBranch] = useState();
  const project = httpServices.getServiceStorage();
  const { data: branchOption, refetch: refetchBranch } = useGetBranchOptions({
    project: project,
    service: stateService,
  });
  const branchOptions = branchOption?.data?.data;
  const { data: serviceOption, refetch: refetchService } = useGetReceptions({ project: project, branch: stateBranch });
  const optionsReceptions = serviceOption?.data?.data;

  const { values, setFieldValue, errors } = useFormikContext();
  //! Functions
  //! Render
  return (
    <Box className={classes.filterContainer}>
      {/* <Grid container spacing={2}> */}
      {/* <Grid item xs={12} md key="from"> */}
      <Field
        LabelColorPrimary
        maxDate={values.to || new Date()}
        label={t('common:from')}
        name="from"
        component={CustomField.DateField}
      />
      {/* </Grid> */}
      {/* <Grid item xs={12} md key="to"> */}
      <Field
        LabelColorPrimary
        minDate={values.from || moment().startOf('month').toISOString()}
        label={t('common:to')}
        name="to"
        component={CustomField.DateField}
      />
      {/* </Grid> */}
      {/* <Grid item xs={12} md key="branch">
          <Field
            LabelColorPrimary
            component={CustomField.SelectField}
            label={t('common:branch')}
            name="branch"
            options={branchOptions}
            afterOnChange={(e) => {
              setStateBranch(e.target.value);
              refetchService();
            }}
            IconComponent={isEmpty(values.branch) || isEmpty(values.service) ? CommonIcons.Dropdown : ''}
            endAdornment={
              !isEmpty(values.branch) &&
              !isEmpty(values.service) && (
                <InputAdornment
                  position="end"
                  className={classes.deleteSelect}
                  onClick={() => {
                    setFieldValue('branch', '');
                    setFieldValue('service', '');
                    setStateBranch('');
                    setStateService('');
                  }}
                >
                  <CommonIcons.ClearIcon className="icon" />
                </InputAdornment>
              )
            }
          />
        </Grid>
        <Grid item xs={12} md key="service">
          <Field
            LabelColorPrimary
            component={CustomField.SelectField}
            label={t('common:data_service')}
            name="service"
            options={optionsReceptions}
            afterOnChange={(e) => {
              setStateService(e.target.value);
              refetchBranch();
            }}
            endAdornment={
              !isEmpty(values.branch) &&
              !isEmpty(values?.service) && (
                <InputAdornment
                  position="end"
                  className={classes.deleteSelect}
                  onClick={() => {
                    setFieldValue('service', '');
                    setStateService('');
                  }}
                >
                  <CommonIcons.ClearIcon className="icon" />
                </InputAdornment>
              )
            }
            IconComponent={isEmpty(values.branch) || isEmpty(values.service) ? CommonIcons.Dropdown : ''}
          />
        </Grid> */}
      {/* <Grid item xs={24} md> */}
      <BranchServiceReception
        noRequired
        label={{ branch: `${t('common:data_branch')}`, service: `${t('common:data_service')}` }}
      />
      {/* </Grid> */}
      {(userRole === roles.TELESALE_LEAD || userRole === roles.PAGE_LEAD) && filters?.status === 'team' ? (
        // <Grid item xs={12} md key="employee">
        <Field
          LabelColorPrimary
          label={t('common:employee')}
          name="employee"
          component={CustomField.AutocompleteAsyncField}
          roleOption={checkUserRole()}
          loadOptionsByRequest={loadOptionsLineAsync}
          valueProject={project}
          fullWidth
        />
      ) : // </Grid>
      null}
      {/* </Grid> */}
    </Box>
  );
};

export default FilterTab;
