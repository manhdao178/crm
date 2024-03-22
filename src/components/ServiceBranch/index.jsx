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

const empty = () => {
  return <div></div>;
};

const ServiceBranch = ({
  label = { branch: 'Chọn chi nhánh', service: 'Loại dịch vụ' },
  disabled = false,
  name = { branch: 'branch', service: 'service' },
  placeholder,
}) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext();
  const [stateService, setStateService] = useState(values?.service);
  const [stateBranch, setStateBranch] = useState(values?.branch);

  const project = httpServices.getServiceStorage();

  const { data: branchOption } = useGetBranchOptions({ project: project, service: stateService });
  const branchOptions = branchOption?.data?.data;

  const { data: serviceOption } = useGetReceptions({ project: project, branch: stateBranch });
  const optionsReceptions = serviceOption?.data?.data;

  const clearable = !isEmpty(values[name.branch]) && !isEmpty(values[name.service]);
  const selectable = isEmpty(values[name.branch]) || isEmpty(values[name.service]);

  //! Function
  useEffect(() => {
    setStateService(values[name.service]);
  }, [values[name.service]]);

  useEffect(() => {
    setStateBranch(values[name.branch]);
  }, [values[name.branch]]);

  const handleDelete = () => {
    setFieldValue('branch', '');
    setFieldValue('service', '');
  };

  //! Render
  return (
    <Fragment>
      <Field
        disabled={disabled}
        label={label.branch}
        placeholder={placeholder?.branch}
        options={branchOptions}
        LabelColorPrimary
        name={name.branch}
        component={CustomField.SelectField}
        endAdornment={
          clearable && (
            <InputAdornment position="end" className={classes.deleteSelect} onClick={handleDelete}>
              <CommonStyles.Button
                variant="text"
                disabled={disabled}
                sx={{ padding: '5px', minWidth: '15px', width: '15px' }}
              >
                <CommonIcons.ClearIcon className="icon" />
              </CommonStyles.Button>
            </InputAdornment>
          )
        }
        IconComponent={selectable ? CommonIcons.Dropdown : empty}
      />
      <Field
        disabled={disabled}
        label={label.service}
        placeholder={placeholder?.service}
        options={optionsReceptions}
        LabelColorPrimary
        name={name.service}
        component={CustomField.SelectField}
        endAdornment={
          clearable && (
            <InputAdornment position="end" className={classes.deleteSelect} onClick={handleDelete}>
              <CommonStyles.Button
                variant="text"
                disabled={disabled}
                sx={{ padding: '5px', minWidth: '15px', width: '15px' }}
              >
                <CommonIcons.ClearIcon className="icon" />
              </CommonStyles.Button>
            </InputAdornment>
          )
        }
        IconComponent={selectable ? CommonIcons.Dropdown : empty}
      />
    </Fragment>
  );
};

export default memo(ServiceBranch);
