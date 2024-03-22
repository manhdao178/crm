import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Fragment } from 'react';
import useTogglePopover from 'hooks/useTogglePopover';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import { isDate, isEmpty } from 'lodash';
import PopoverFilterHeader from './PopoverFilterHeader';

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

const ActionFilterHeader = ({ title, label }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { anchorEl, handleClose, open, handleClick } = useTogglePopover();
  const { filterTableArchives } = useContactPageLead();
  const valueFilter = filterTableArchives[`${title}`];
  const isActiveFilter =
    !isEmpty(valueFilter) ||
    isDate(valueFilter) ||
    (typeof valueFilter === 'boolean' && valueFilter) ||
    (title === 'interactiveDate' && filterTableArchives.startInteractiveDate) ||
    (title === 'firstAssignDate' && filterTableArchives.startFirstAssignDate) ||
    (title === 'assignDate' && filterTableArchives.startAssignDate);

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
        <PopoverFilterHeader title={title} label={label} handleClose={handleClose} />
      </CommonStyles.PopoverMui>
    </Fragment>
  );
};

export default ActionFilterHeader;
