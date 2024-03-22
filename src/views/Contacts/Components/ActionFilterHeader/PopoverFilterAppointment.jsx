import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, Form, Formik, useFormikContext } from 'formik';
import CustomField from 'components/CustomField';
import httpServices from 'services/httpServices';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import { useGetReceptions } from 'hooks/receptions/useGetReceptions';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import { loadOptionsAsyncFilter, loadOptionsLineAsync } from 'helpers/loadOptionsAsync';

const useStyles = makeStyles((theme) => {
  return {
    wrapperFilter: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '20px',
      '& .btnGroup': {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        '& .btn': {
          height: '40px',
        },
      },
    },
  };
});

const PopoverFilterAppointment = ({ title, label, handleClose }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const { filterTableAppointment, setFilterTableAppointment } = useContactPageLead();
  const [valueFilter, setValueFilter] = useState(filterTableAppointment);

  const optionStatus = [
    { label: 'Khách đã hẹn', value: 'IN_PROCESS' },
    { label: 'Khách đã đến', value: 'FINISHED' },
    { label: 'Huỷ', value: 'CANCELLED' },
  ];

  const project = httpServices.getServiceStorage();
  const { data: resBranchOption } = useGetBranchOptions({ project: project });
  const branchOption = resBranchOption?.data?.data || [];

  const { data: resServiceOption } = useGetReceptions({ project: project });
  const serviceOptions = resServiceOption?.data?.data || [];

  //! Function

  //! Render
  return (
    <div className={classes.wrapperFilter} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {(title === 'name' || title === 'phoneNumber') && (
        <CustomField.InputField
          value={valueFilter?.[`${title}`]}
          onChange={(e) => setValueFilter((prev) => ({ ...prev, [title]: e.target.value }))}
          label={`${t(`common:${label}`)}`}
          type={title === 'phoneNumber' ? 'number' : 'text'}
        />
      )}
      {title === 'date' && (
        <CustomField.DateField
          label={`${t(`common:${label}`)}`}
          value={valueFilter?.[title]}
          afterOnChange={(date) => {
            setValueFilter((prev) => ({ ...prev, [title]: date }));
          }}
        />
      )}
      {title === 'services' && (
        <CustomField.SelectField
          isMultiple
          name={title}
          label={`${t(`common:${label}`)}`}
          options={serviceOptions}
          value={valueFilter?.[title]}
          afterOnChange={(value) => setValueFilter((prev) => ({ ...prev, [title]: value }))}
        />
      )}
      {title === 'branch' && (
        <CustomField.SelectField
          isMultiple
          name={title}
          label={`${t(`common:${label}`)}`}
          options={branchOption}
          value={valueFilter?.[title]}
          afterOnChange={(value) => setValueFilter((prev) => ({ ...prev, [title]: value }))}
        />
      )}
      {title === 'status' && (
        <CustomField.SelectField
          name={title}
          options={optionStatus}
          afterOnChange={(e) => {
            setValueFilter((prev) => ({ ...prev, [title]: e.target.value }));
          }}
          value={valueFilter?.[title]}
        />
      )}
      {title === 'telesales' && (
        <CustomField.AutocompleteAsyncField
          name="telesales"
          label="Telesale"
          LabelColorPrimary
          multiple
          loadOptionsByRequest={loadOptionsAsyncFilter}
          valueProject={project}
          value={valueFilter?.[title]}
          afterOnChange={(value) => {
            setValueFilter((prev) => ({ ...prev, [title]: value }));
          }}
        />
      )}
      <div className="btnGroup">
        <CommonStyles.Button
          className="btn"
          onClick={() => {
            setFilterTableAppointment((prev) => ({ ...prev, [title]: title === 'telesales' ? [] : '' }));
            handleClose();
          }}
        >
          Cancel
        </CommonStyles.Button>
        <CommonStyles.Button
          className="btn"
          onClick={() => {
            setFilterTableAppointment((prev) => ({ ...prev, ...valueFilter }));
            handleClose();
          }}
        >
          OK
        </CommonStyles.Button>
      </div>
    </div>
  );
};

export default PopoverFilterAppointment;
