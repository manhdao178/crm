import React, { useEffect, useRef, useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import { makeStyles } from '@mui/styles';
import ModalCall from '../Modal/ModalCall';
import MinimizeCall from '../Components/MinimizeCall';
import { useCall } from 'providers/CallProvider';

const useStyles = makeStyles((theme) => {
  return {};
});

const CallingModal = ({ open, toggle }) => {
  //! State
  const { isUserConfirm, callStatus, item, onClickCancelCall } = useCall();
  const callTime = useRef();
  const [time, setTime] = useState(0);
  const [minimizeCall, setMinimizeCall] = useState(false);

  useEffect(() => {
    if (isUserConfirm) {
      callTime.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      clearInterval(callTime.current);
    };
  }, [isUserConfirm]);

  //! Function
  const handleClose = (e, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setMinimizeCall(true);
    } else {
      setMinimizeCall(false);
    }
  };

  //! Render
  if (minimizeCall) {
    return <MinimizeCall time={time} onClickCancelCall={onClickCancelCall} callStatus={callStatus} />;
  }

  return (
    <CommonStyles.Modal
      open={open}
      toggle={toggle}
      content={
        <ModalCall
          phoneNumber={item?.phoneNumber}
          onClickCancelCall={onClickCancelCall}
          callStatus={callStatus}
          time={time}
        />
      }
      onClose={handleClose}
    />
  );
};

export default React.memo(CallingModal);
