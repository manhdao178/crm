import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import CallingStep1 from 'assets/IconsSVG/Telesale/CallingStep1.svg';
import CallingStep2 from 'assets/IconsSVG/Telesale/CallingStep2.svg';
import CallingStep3 from 'assets/IconsSVG/Telesale/CallingStep3.svg';
import { useCall } from 'providers/CallProvider';
import moment from 'moment';

const useStyles = makeStyles((theme) => {
  return {
    call_container: {
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon_container: {
      width: '83px',
      height: '83px',
      borderRadius: '22.64px',
      backgroundColor: '#EBF2FE',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // marginBottom: '14px',
      '& .icon': {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '45px',
        height: '45px',
        animation: '$calling 2s linear infinite',
      },
    },
    status: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '600',
      color: '#124072',
      marginBottom: '8px',
    },
    phoneNumber: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: '400',
      color: '#708090',
      marginBottom: '32px',
    },
    btnGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      gap: '20px',
    },
    time: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: '400',
      color: '#708090',
    },
    acceptBtn: {
      '&:hover': {
        backgroundColor: '#1ec73f !important',
      },
    },
    '@keyframes calling': {
      '0%': {
        backgroundImage: `url(${CallingStep1})`,
      },
      '33%': {
        backgroundImage: `url(${CallingStep2})`,
      },
      '66%': {
        backgroundImage: `url(${CallingStep3})`,
      },
      '100%': {
        backgroundImage: `url(${CallingStep1})`,
      },
    },
  };
});

const ModalCall = ({ phoneNumber, onClickCancelCall, callStatus, time }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { onClickAcceptCall, onClickDeclineCall, isIncoming, toggle } = useCall();
  //! Function
  const formatPhoneNumber = (number) => {
    return number?.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3') || 'no phone number';
  };
  //! Render
  return (
    <div className={classes.call_container}>
      <div className={classes.icon_container}>
        <div className="icon"></div>
      </div>
      <div className={classes.status}>{callStatus}</div>
      <div className={classes.time}>{moment.utc(time * 1000).format('HH:mm:ss')}</div>
      <div className={classes.phoneNumber}>{formatPhoneNumber(phoneNumber)}</div>
      <div className={classes.btnGroup}>
        {isIncoming && (
          <CommonStyles.Button
            variant="contained"
            style={{ width: '203px', backgroundColor: '#10e63a' }}
            className={classes.acceptBtn}
            onClick={onClickAcceptCall}
          >
            {t('common:contacts_accept')}
          </CommonStyles.Button>
        )}
        <CommonStyles.Button
          variant="contained"
          color="error"
          style={{ width: '203px' }}
          onClick={isIncoming ? onClickDeclineCall : onClickCancelCall}
        >
          {t('common:contacts_cancel')}
        </CommonStyles.Button>
      </div>
    </div>
  );
};

export default ModalCall;
