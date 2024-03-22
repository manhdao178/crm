import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {
    Header: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    Title: {
      fontSize: '14px',
      textTransform: 'uppercase',
      fontWeight: 700,
      color: theme.custom.colors.darkblue,
      borderBottom: `2px solid ${theme.custom.colors.darkblue}`,
      display: 'flex',
      alignItems: 'center',
    },
    Button: {
      background: '#f1f2f4',
      borderRadius: '12px',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
  };
});

const HeaderModal = ({ toggle = () => {} }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <div className={classes.Header}>
      <span className={classes.Title}>{t('common:add_key', { key: t('common:data') })}</span>
      <div className={classes.Button} onClick={toggle}>
        <CommonIcons.Close className={classes.IconButton}></CommonIcons.Close>
      </div>
    </div>
  );
};

export default HeaderModal;
