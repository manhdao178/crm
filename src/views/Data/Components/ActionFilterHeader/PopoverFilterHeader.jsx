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
import { Box } from '@mui/material';

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
    label: {
      color: `${theme.custom.colors.darkblue} !important`,
    },
  };
});

const PopoverFilterHeader = ({ title, label, handleClose }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const { filterTableDataPage, setFilterTableDataPage } = useContactPageLead();
  const [valueFilter, setValueFilter] = useState(filterTableDataPage);

  const project = httpServices.getServiceStorage();

  const { data: resBranchOption } = useGetBranchOptions({ project: project });
  const branchOptions = resBranchOption?.data?.data || [];

  const { data: resServiceOption } = useGetReceptions({ project: project });
  const serviceOptions = resServiceOption?.data?.data || [];

  //! Function

  const handleSetFilterTableDataPage = () => {
    //interactiveDate
    if (!valueFilter.startInteractiveDate && valueFilter.endInteractiveDate) {
      setFilterTableDataPage((prev) => ({
        ...prev,
        ...valueFilter,
        startInteractiveDate: valueFilter.endInteractiveDate,
      }));
    } else if (valueFilter.startInteractiveDate && !valueFilter.endInteractiveDate) {
      setFilterTableDataPage((prev) => ({
        ...prev,
        ...valueFilter,
        endInteractiveDate: valueFilter.startInteractiveDate,
      }));
    }

    //firstAssignDate
    else if (!valueFilter.startFirstAssignDate && valueFilter.endFirstAssignDate) {
      setFilterTableDataPage((prev) => ({
        ...prev,
        ...valueFilter,
        startFirstAssignDate: valueFilter.endFirstAssignDate,
      }));
    } else if (valueFilter.startFirstAssignDate && !valueFilter.endFirstAssignDate) {
      setFilterTableDataPage((prev) => ({
        ...prev,
        ...valueFilter,
        endFirstAssignDate: valueFilter.startFirstAssignDate,
      }));
    }

    //lastAssignDate
    else if (!valueFilter.startAssignDate && valueFilter.endAssignDate) {
      setFilterTableDataPage((prev) => ({
        ...prev,
        ...valueFilter,
        startAssignDate: valueFilter.endAssignDate,
      }));
    } else if (valueFilter.startAssignDate && !valueFilter.endAssignDate) {
      setFilterTableDataPage((prev) => ({
        ...prev,
        ...valueFilter,
        endAssignDate: valueFilter.startAssignDate,
      }));
    } else {
      setFilterTableDataPage((prev) => ({ ...prev, ...valueFilter }));
    }
    handleClose();
  };

  const handleDeleteFilter = () => {
    if (title === 'fanpage' || title === 'telesales' || title === 'firstTelesales') {
      setFilterTableDataPage((prev) => ({ ...prev, [title]: [] }));
    } else if (title === 'interactiveDate') {
      setFilterTableDataPage((prev) => ({ ...prev, startInteractiveDate: '', endInteractiveDate: '' }));
    } else if (title === 'firstAssignDate') {
      setFilterTableDataPage((prev) => ({ ...prev, startFirstAssignDate: '', endFirstAssignDate: '' }));
    } else if (title === 'assignDate') {
      setFilterTableDataPage((prev) => ({ ...prev, startAssignDate: '', endAssignDate: '' }));
    } else {
      setFilterTableDataPage((prev) => ({ ...prev, [title]: '' }));
    }
    handleClose();
  };

  //! Render
  return (
    <div className={classes.wrapperFilter} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {(title === 'fullname' || title === 'phoneNumber' || title === 'fanpageIDs') && (
        <CustomField.InputField
          value={valueFilter?.[`${title}`]}
          onChange={(e) => setValueFilter((prev) => ({ ...prev, [title]: e.target.value }))}
          label={`${t(`common:${label}`)}`}
          type={title === 'phoneNumber' ? 'number' : 'text'}
        />
      )}
      {title === 'fanpage' && (
        <CustomField.AutocompleteAsyncField
          label={`${t(`common:${label}`)}`}
          value={valueFilter?.[title]}
          multiple
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
            value={valueFilter?.startInteractiveDate}
            afterOnChange={(date) => {
              setValueFilter((prev) => ({ ...prev, startInteractiveDate: date }));
            }}
            maxDate={valueFilter?.endInteractiveDate}
          />
          <CustomField.DateField
            label="To"
            value={valueFilter?.endInteractiveDate}
            afterOnChange={(date) => {
              setValueFilter((prev) => ({ ...prev, endInteractiveDate: date }));
            }}
            minDate={valueFilter?.startInteractiveDate}
          />
        </>
      )}
      {title === 'firstAssignDate' && (
        <>
          <CustomField.DateField
            label={`${t(`common:${label}`)} from`}
            value={valueFilter?.startFirstAssignDate}
            afterOnChange={(date) => {
              setValueFilter((prev) => ({ ...prev, startFirstAssignDate: date }));
            }}
            maxDate={valueFilter?.endFirstAssignDate}
          />
          <CustomField.DateField
            label="To"
            value={valueFilter?.endFirstAssignDate}
            afterOnChange={(date) => {
              setValueFilter((prev) => ({ ...prev, endFirstAssignDate: date }));
            }}
            minDate={valueFilter?.startFirstAssignDate}
          />
        </>
      )}
      {title === 'assignDate' && (
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
      {(title === 'telesales' || title === 'firstTelesales') && (
        <CustomField.AutocompleteAsyncField
          name="telesales"
          label="Telesale"
          LabelColorPrimary
          multiple
          roleOption="TELESALE,TELESALE_LEAD"
          loadOptionsByRequest={loadOptionsAsyncFilter}
          valueProject={project}
          value={valueFilter?.[title]}
          afterOnChange={(value) => {
            setValueFilter((prev) => ({ ...prev, [title]: value }));
          }}
        />
      )}
      {title === 'isBadPhoneNumber' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className={classes.label}>{t('common:data_wrongNumber')}</div>
          <CommonStyles.Checkbox
            checked={valueFilter?.[`${title}`]}
            onChange={() => setValueFilter((prev) => ({ ...valueFilter, [title]: !prev[title] }))}
          />
        </Box>
      )}
      <div className="btnGroup">
        {title !== 'isBadPhoneNumber' && (
          <CommonStyles.Button className="btn" onClick={handleDeleteFilter}>
            Cancel
          </CommonStyles.Button>
        )}
        <CommonStyles.Button className="btn" onClick={handleSetFilterTableDataPage}>
          OK
        </CommonStyles.Button>
      </div>
    </div>
  );
};

export default PopoverFilterHeader;
