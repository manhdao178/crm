import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Fragment } from 'react';
import useTogglePopover from 'hooks/useTogglePopover';
import PopoverFilterContent from './PopoverFilterContent';
import { Form, Formik, useFormikContext } from 'formik';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import PopoverFilterAppointment from './PopoverFilterAppointment';
import { isDate, isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => {
  return {
    FilterTable: {
      width: '30px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
    },
    filterIcon: {
      '& path': {
        fill: theme.custom.colors.green,
      },
    },
  };
});

const ActionFilterHeader = ({ title, label, isAppointment }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { anchorEl, handleClose, open, handleClick } = useTogglePopover();
  const { filterTableContact, filterTableAppointment } = useContactPageLead();
  const isActiveFilter = isAppointment
    ? !isEmpty(filterTableAppointment[`${title}`]) || isDate(filterTableAppointment[`${title}`])
    : !isEmpty(filterTableContact[`${title}`]) ||
      isDate(filterTableContact[`${title}`]) ||
      (title === 'interactiveDate' && filterTableContact.startAssignDate);

  //! Function

  //! Render
  return (
    <Fragment>
      <div className={classes.FilterTable}>
        <CommonIcons.IconFilter className={isActiveFilter && classes.filterIcon} onClick={(e) => handleClick(e)} />
      </div>

      <CommonStyles.PopoverMui
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        handleClose={handleClose}
        // onClose={handleOnClose}
      >
        {isAppointment ? (
          <PopoverFilterAppointment title={title} label={label} handleClose={handleClose} />
        ) : (
          <PopoverFilterContent title={title} label={label} handleClose={handleClose} />
        )}
      </CommonStyles.PopoverMui>
    </Fragment>
  );
};

export default ActionFilterHeader;
