import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import useToggleDialog from 'hooks/useToggleDialog';
import { useAuthentication } from 'providers/AuthenticationProvider';

const useStyles = makeStyles((theme) => {
  return {
    btnLogout: {
      width: '100% !important',
      padding: '8px 16px !important',
      color: `${theme.custom.colors.black} !important`,
      borderRadius: '0 !important',
      '&:hover': {
        backgroundColor: '#0000000a !important',
        color: `${theme.custom.colors.black} !important`,
      },
      '& span': {
        textAlign: 'left',
      },
    },
  };
});

const LogoutConfirm = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { open: openLogoutConfirm, toggle: toggleLogout, shouldRender: shouldRenderLogoutConfirm } = useToggleDialog();
  const { logout } = useAuthentication();

  //! Function

  const renderLogoutConfirmDialog = () => {
    return (
      <CommonStyles.Modal
        open={openLogoutConfirm}
        toggle={toggleLogout}
        header={t('common:logout')}
        content={t('common:logout_confirm')}
        footer={
          <Fragment>
            <CommonStyles.Button onClick={toggleLogout} variant="outlined">
              {t('common:cancel')}
            </CommonStyles.Button>
            <CommonStyles.Button onClick={logout} variant="contained">
              {t('common:logout')}
            </CommonStyles.Button>
          </Fragment>
        }
      />
    );
  };

  //! Render
  return (
    <Fragment>
      {shouldRenderLogoutConfirm && renderLogoutConfirmDialog()}

      <ListItemButton variant="text" className={classes.btnLogout} onClick={toggleLogout}>
        <ListItemIcon>
          <CommonIcons.Logout />
        </ListItemIcon>
        <ListItemText primary={t('common:logout')} />
      </ListItemButton>
    </Fragment>
  );
};

export default LogoutConfirm;
