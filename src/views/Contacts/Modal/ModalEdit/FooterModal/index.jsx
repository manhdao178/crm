import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { Box } from '@mui/system';
import { useCall } from 'providers/CallProvider';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';

const useStyles = makeStyles((theme) => {
  return {
    Footer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      paddingTop: '30px',
      marginBottom: '20px',
    },
  };
});

const FooterModal = ({ onSaveInfo = () => {}, onClickCall, toggleAddCalendar }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { tabPageLead } = useContactPageLead();
  const { isCalling } = useCall();

  //! Function

  //! Render
  return (
    <Box className={classes.Footer}>
      <CommonStyles.Button variant="outlined" onClick={onSaveInfo}>
        {t('common:contacts_saveInfo')}
      </CommonStyles.Button>
      <CommonStyles.Button
        onClick={onClickCall}
        style={{ background: '#2886CF' }}
        disabled={isCalling || tabPageLead !== 'personal'}
      >
        {t('common:contacts_call')}
      </CommonStyles.Button>
      <CommonStyles.Button onClick={toggleAddCalendar} disabled={tabPageLead !== 'personal'}>
        {t('common:contacts_setCalendar')}
      </CommonStyles.Button>
    </Box>
  );
};

export default FooterModal;
