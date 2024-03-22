import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CallingStep1 from 'assets/IconsSVG/Telesale/CallingStep1.svg';
import CallingStep2 from 'assets/IconsSVG/Telesale/CallingStep2.svg';
import CallingStep3 from 'assets/IconsSVG/Telesale/CallingStep3.svg';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { useCall } from 'providers/CallProvider';

const useStyles = makeStyles((theme) => {
  return {
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
        animation: '$calling 1s linear infinite',
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
    acceptBtn: {
      '&:hover': {
        backgroundColor: '#1ec73f !important',
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

const MinimizeCall = ({ time, onClickCancelCall, callStatus }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { onClickAcceptCall, onClickDeclineCall, isIncoming } = useCall();

  //! Function

  //! Render
  return ReactDOM.createPortal(
    <div className={classes.minimizeCall}>
      <div className={classes.icon_container}>
        <div className="icon"></div>
      </div>
      <div className={classes.status}>
        <div className={classes.connect}>{callStatus}</div>
        <div className={classes.time}>{moment.utc(time * 1000).format('HH:mm:ss')}</div>
      </div>
      <CommonStyles.Button
        variant="contained"
        color="error"
        sx={{ width: '166px' }}
        onClick={isIncoming ? onClickDeclineCall : onClickCancelCall}
      >
        {t('common:contacts_cancel')}
      </CommonStyles.Button>
      {isIncoming && (
        <CommonStyles.Button
          variant="contained"
          style={{ width: '203px', backgroundColor: '#10e63a', marginLeft: '10px' }}
          className={classes.acceptBtn}
          onClick={onClickAcceptCall}
        >
          {t('common:contacts_accept')}
        </CommonStyles.Button>
      )}
    </div>,
    document.body,
  );
};

export default MinimizeCall;
