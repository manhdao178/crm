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
import { Fragment } from 'react';
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

  const { filterTableArchives, setFilterTableArchives } = useContactPageLead();
  const [valueFilter, setValueFilter] = useState(filterTableArchives);

  const project = httpServices.getServiceStorage();

  const { data: resBranchOption } = useGetBranchOptions({ project: project });
  const branchOptions = resBranchOption?.data?.data || [];

  const { data: resServiceOption } = useGetReceptions({ project: project });
  const serviceOptions = resServiceOption?.data?.data || [];

  //! Function

  const handleSetFilterTableArchives = () => {
    //interactiveDate
    if (!valueFilter.startInteractiveDate && valueFilter.endInteractiveDate) {
      setFilterTableArchives((prev) => ({
        ...prev,
        ...valueFilter,
        startInteractiveDate: valueFilter.endInteractiveDate,
      }));
    } else if (valueFilter.startInteractiveDate && !valueFilter.endInteractiveDate) {
      setFilterTableArchives((prev) => ({
        ...prev,
        ...valueFilter,
        endInteractiveDate: valueFilter.startInteractiveDate,
      }));
    }
    //firstAssignDate
    else if (!valueFilter.startFirstAssignDate && valueFilter.endFirstAssignDate) {
      setFilterTableArchives((prev) => ({
        ...prev,
        ...valueFilter,
        startFirstAssignDate: valueFilter.endFirstAssignDate,
      }));
    } else if (valueFilter.startFirstAssignDate && !valueFilter.endFirstAssignDate) {
      setFilterTableArchives((prev) => {
        return {
          ...prev,
          ...valueFilter,
          endFirstAssignDate: valueFilter.startFirstAssignDate,
        };
      });
    }
    //lastAssignDate
    else if (!valueFilter.startAssignDate && valueFilter.endAssignDate) {
      setFilterTableArchives((prev) => ({
        ...prev,
        ...valueFilter,
        startAssignDate: valueFilter.endAssignDate,
      }));
    } else if (valueFilter.startAssignDate && !valueFilter.endAssignDate) {
      setFilterTableArchives((prev) => ({
        ...prev,
        ...valueFilter,
        endAssignDate: valueFilter.startAssignDate,
      }));
    } else {
      setFilterTableArchives((prev) => ({ ...prev, ...valueFilter }));
    }
    handleClose();
  };

  const handleDeleteFilter = () => {
    if (title === 'fanpage' || title === 'telesales' || title === 'firstTelesales') {
      setFilterTableArchives((prev) => ({ ...prev, [title]: [] }));
    } else if (title === 'interactiveDate') {
      setFilterTableArchives((prev) => ({ ...prev, startInteractiveDate: '', endInteractiveDate: '' }));
    } else if (title === 'firstAssignDate') {
      setFilterTableArchives((prev) => ({ ...prev, startFirstAssignDate: '', endFirstAssignDate: '' }));
    } else if (title === 'assignDate') {
      setFilterTableArchives((prev) => ({ ...prev, startAssignDate: '', endAssignDate: '' }));
    } else {
      setFilterTableArchives((prev) => ({ ...prev, [title]: '' }));
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
      {title === 'isDuplicatePhoneNumber' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className={classes.label}>{t('common:data_duplicate')}</div>
          <CommonStyles.Checkbox
            checked={valueFilter?.[`${title}`]}
            onChange={() => setValueFilter((prev) => ({ ...valueFilter, [title]: !prev[title] }))}
          />
        </Box>
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
          roleOption="TELESALE,TELESALE_LEAD"
          LabelColorPrimary
          multiple
          loadOptionsByRequest={loadOptionsAsyncFilter}
          valueProject={project}
          value={valueFilter?.[title]}
          afterOnChange={(value) => {
            setValueFilter((prev) => ({ ...prev, [title]: value }));
          }}
          isBypassBranch
        />
      )}
      <div className="btnGroup">
        {title !== 'isDuplicatePhoneNumber' && (
          <CommonStyles.Button className="btn" onClick={handleDeleteFilter}>
            Cancel
          </CommonStyles.Button>
        )}
        <CommonStyles.Button className="btn" onClick={handleSetFilterTableArchives}>
          OK
        </CommonStyles.Button>
      </div>
    </div>
  );
};

export default PopoverFilterHeader;
