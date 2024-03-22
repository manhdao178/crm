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

const PopoverFilterContent = ({ title, label, handleClose }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const { filterTableContact, setFilterTableContact } = useContactPageLead();
  const [valueFilter, setValueFilter] = useState(filterTableContact);

  const project = httpServices.getServiceStorage();

  const { data: resBranchOption } = useGetBranchOptions({ project: project });
  const branchOptions = resBranchOption?.data?.data || [];

  const { data: resServiceOption } = useGetReceptions({ project: project });
  const serviceOptions = resServiceOption?.data?.data || [];

  //! Function
  const handleSetFilterTableContact = () => {
    if (!valueFilter.startAssignDate && valueFilter.endAssignDate) {
      setFilterTableContact((prev) => ({
        ...prev,
        ...valueFilter,
        startAssignDate: valueFilter.endAssignDate,
      }));
    } else if (valueFilter.startAssignDate && !valueFilter.endAssignDate) {
      setFilterTableContact((prev) => ({
        ...prev,
        ...valueFilter,
        endAssignDate: valueFilter.startAssignDate,
      }));
    } else {
      setFilterTableContact((prev) => ({ ...prev, ...valueFilter }));
    }
    handleClose();
  };

  const handleDeleteFilter = () => {
    if (title === 'fanpage' || title === 'telesales' || title === 'firstTelesales') {
      setFilterTableContact((prev) => ({ ...prev, [title]: [] }));
    } else if (title === 'interactiveDate') {
      setFilterTableContact((prev) => ({ ...prev, startAssignDate: '', endAssignDate: '' }));
    } else {
      setFilterTableContact((prev) => ({ ...prev, [title]: '' }));
    }
    handleClose();
  };

  //! Render
  return (
    <div className={classes.wrapperFilter} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {(title === 'fullname' || title === 'phoneNumber') && (
        <CustomField.InputField
          value={valueFilter?.[`${title}`]}
          onChange={(e) => setValueFilter((prev) => ({ ...prev, [title]: e.target.value }))}
          label={`${t(`common:${label}`)}`}
          type={title === 'phoneNumber' ? 'number' : 'text'}
        />
      )}
      {title === 'fanpage' && (
        <CustomField.AutocompleteAsyncField
          multiple
          label={`${t(`common:${label}`)}`}
          value={valueFilter?.[title]}
          afterOnChange={(value) => setValueFilter((prev) => ({ ...prev, [title]: value }))}
          valueProject={project}
          roleOption="FANPAGE"
          loadOptionsByRequest={loadOptionsAsyncFilter}
        />
      )}
      {title === 'reCallDate' && (
        <CustomField.DateField
          label={`${t(`common:${label}`)}`}
          value={valueFilter?.[title]}
          afterOnChange={(date) => {
            setValueFilter((prev) => ({ ...prev, [title]: date }));
          }}
        />
      )}
      {title === 'interactiveDate' && (
        <>
          <CustomField.DateField
            label={`${t(`common:${label}`)} from`}
            value={valueFilter?.startAssignDate}
            afterOnChange={(date) => {
              setValueFilter((prev) => ({ ...prev, startAssignDate: date }));
            }}
            maxDate={valueFilter?.endAssignDate}
          />
          <CustomField.DateField
            // label={`${t(`common:${label}`)}`}
            label="To"
            value={valueFilter?.endAssignDate}
            afterOnChange={(date) => {
              setValueFilter((prev) => ({ ...prev, endAssignDate: date }));
            }}
            minDate={valueFilter?.startAssignDate}
          />
        </>
      )}
      {(title === 'branch' || title === 'service') && (
        <CustomField.SelectField
          isMultiple
          name={title}
          label={`${t(`common:${label}`)}`}
          options={title === 'branch' ? branchOptions : serviceOptions}
          value={valueFilter?.[title]}
          afterOnChange={(value) => setValueFilter((prev) => ({ ...prev, [title]: value }))}
        />
      )}
      {title === 'telesales' && (
        <CustomField.AutocompleteAsyncField
          multiple
          name="telesales"
          label="Telesale"
          LabelColorPrimary
          roleOption="TELESALE,TELESALE_LEAD"
          loadOptionsByRequest={loadOptionsAsyncFilter}
          valueProject={project}
          value={valueFilter?.[title]}
          afterOnChange={(value) => {
            setValueFilter((prev) => ({ ...prev, [title]: value }));
          }}
        />
      )}
      <div className="btnGroup">
        <CommonStyles.Button className="btn" onClick={handleDeleteFilter}>
          Cancel
        </CommonStyles.Button>
        <CommonStyles.Button className="btn" onClick={handleSetFilterTableContact}>
          OK
        </CommonStyles.Button>
      </div>
    </div>
  );
};

export default PopoverFilterContent;
