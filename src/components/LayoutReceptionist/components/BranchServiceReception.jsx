import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, useFormikContext } from 'formik';
import { useState } from 'react';
import httpServices from 'services/httpServices';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import { useGetReceptions } from 'hooks/receptions/useGetReceptions';
import { Fragment } from 'react';
import { InputAdornment } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import CustomField from 'components/CustomField';
import { memo } from 'react';

const useStyles = makeStyles((theme) => {
  return {
    deleteSelect: {
      '& .icon': {
        fontSize: '15px',
      },
      '&:hover': {
        cursor: 'pointer  ',
      },
    },
  };
});

const BranchServiceReception = ({
  label = { branch: 'Chọn chi nhánh', service: 'Loại dịch vụ' },
  disabledBranch = false,
  disabledService = false,
  name = { branch: 'branch', service: 'service' },
  placeholder,
  noRequired,
}) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext();
  const [stateService, setStateService] = useState(values?.service?.value);
  const [stateBranch, setStateBranch] = useState(values?.branch?.value);

  const project = httpServices.getServiceStorage();

  const { data: branchOption } = useGetBranchOptions({ project: project, service: stateService });
  const branchOptions = branchOption?.data?.data || [];

  const { data: serviceOption } = useGetReceptions({ project: project, branch: stateBranch });
  const optionsReceptions = serviceOption?.data?.data || [];

  //! Function
  useEffect(() => {
    setStateService(values.service?.value);
  }, [values.service]);

  useEffect(() => {
    setStateBranch(values.branch?.value);
  }, [values.branch]);

  //! Render
  return (
    <Fragment>
      <Field
        isAutoCompleteOne
        label={label.branch}
        placeholder={placeholder?.branch}
        options={branchOptions}
        LabelColorPrimary
        name={name.branch}
        component={CustomField.SelectField}
        required={!noRequired}
        disabled={disabledBranch}
      />
      <Field
        isAutoCompleteOne
        label={label.service}
        placeholder={placeholder?.service}
        options={optionsReceptions}
        LabelColorPrimary
        name={name.service}
        component={CustomField.SelectField}
        required={!noRequired}
        disabled={disabledService}
      />
    </Fragment>
  );
};

export default memo(BranchServiceReception);
