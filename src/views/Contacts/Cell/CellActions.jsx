import React from 'react';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import { makeStyles } from '@mui/styles';
import ContentModal from '../Modal/ModalEdit/ContentModal';
import HeaderModalAddCalendar from '../Modal/ModalAddCalendar/HeaderModalAddCalendar';
import ContentModalAddCalendar from '../Modal/ModalAddCalendar/ContentModalAddCalendar';
import Calling from 'assets/IconsSVG/Telesale/CallingStep3.svg';
import { useCall } from 'providers/CallProvider';
import httpServices from 'services/httpServices';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';

const useStyles = makeStyles((theme) => {
  return {
    btnGroup: {
      display: 'flex',
      flexDirection: 'row',
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
    btnAddCalendar: {
      color: `${theme.custom.colors.red} !important `,
    },
    minimizeCall: {
      position: 'fixed',
      top: '100px',
      right: '50px',
      borderRadius: '16px',
      backgroundColor: theme.custom.colors.white,
      zIndex: theme.custom.zIndex.zIndex_max,
      boxShadow: '3px 20px 20px 0px #05295F14',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      animation: '$fromCenter 1s ease-in-out',
    },
    icon_container: {
      width: '58px',
      height: '58px',
      borderRadius: '15.82px',
      backgroundColor: '#EBF2FE',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '16px',
      '& .icon': {
        width: '24px',
        height: '24px',
        backgroundImage: `url(${Calling})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    status: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '32px',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    connect: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '600',
      color: '#124072',
    },
    time: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: '400',
      color: '#708090',
    },
    iscalling: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E2511314',
      borderRadius: '8px',
      width: '100%',
      height: '100%',
      '& path': {
        fill: 'red !important',
      },
    },
    '@keyframes fromCenter': {
      from: {
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)',
      },
      to: {
        top: '100px',
        right: '50px',
        transform: 'unset',
      },
    },
  };
});

const CellActions = ({ item }) => {
  //! State
  const classes = useStyles();
  const { isCalling, onClickOpenAndCall } = useCall();
  const { tabPageLead } = useContactPageLead();
  const projectKey = httpServices.getUserInfoStorage();
  const roleKey = projectKey?.userRoleDetail?.key || '';
  const { open: openEdit, toggle: toggleEdit, shouldRender: shouldRenderEdit } = useToggleDialog();
  const { open: openAddCalendar, toggle: toggleAddCalendar, shouldRender: shouldRenderAddCalendar } = useToggleDialog();

  //! Function

  //! Render
  return (
    <div className={classes.btnGroup}>
      {shouldRenderEdit && (
        <CommonStyles.Modal
          open={openEdit}
          toggle={toggleEdit}
          content={<ContentModal item={item} toggle={toggleEdit} toggleAddCalendar={toggleAddCalendar} />}
        />
      )}

      {shouldRenderAddCalendar && (
        <CommonStyles.Modal
          open={openAddCalendar}
          toggle={toggleAddCalendar}
          header={<HeaderModalAddCalendar toggle={toggleAddCalendar} />}
          content={<ContentModalAddCalendar toggle={toggleAddCalendar} item={item} />}
        />
      )}

      {roleKey === 'TELESALE_LEAD' && tabPageLead === 'team' ? (
        ''
      ) : (
        <CommonStyles.Button variant="text" onClick={() => onClickOpenAndCall(item)} disabled={isCalling}>
          {isCalling ? (
            <div className={classes.iscalling}>
              <CommonIcons.IconPhone />
            </div>
          ) : (
            <CommonIcons.IconPhone />
          )}
        </CommonStyles.Button>
      )}

      <CommonStyles.Button onClick={toggleEdit} variant="text">
        <CommonIcons.IconEdit />
      </CommonStyles.Button>

      {roleKey === 'TELESALE_LEAD' && tabPageLead === 'team' ? (
        ''
      ) : (
        <CommonStyles.Button onClick={toggleAddCalendar} className={classes.btnAddCalendar} variant="text">
          <CommonIcons.Add />
        </CommonStyles.Button>
      )}
    </div>
  );
};

export default CellActions;
