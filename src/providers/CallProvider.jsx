import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { showError, showInfo, showSuccess } from 'helpers/toast';
import { useAuthentication } from './AuthenticationProvider';
import useToggleDialog from 'hooks/useToggleDialog';
import { checkStatusCalling } from 'helpers';
import { useTranslation } from 'react-i18next';
import { useAddLeadCalls } from 'hooks/leads/useAddLeadCalls';
import { useEffect } from 'react';
import { useRef } from 'react';
import httpServices from 'services/httpServices';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';
import AudioRing from 'assets/audio/audioRing.mp3';
import CommonStyles from 'components/CommonStyles';
import callServices from 'services/callServices';
import { isEmpty } from 'lodash';

const CallContext = createContext({
  isCalling: false,
  shouldRenderEdit: false,

  minimizeCall: false,
  setMinimizeCall: () => {},

  item: {},
  setItem: () => {},

  startCall: () => {},
  endCall: () => {},

  callStatus: '',

  open: false,
  shouldRender: false,
  toggle: () => {},

  onClickCancelCall: () => {},
  onClickOpenAndCall: () => {},

  isUserConfirm: false,

  onClickAcceptCall: () => {},
  onClickDeclineCall: () => {},

  isIncoming: false,
});

export const useCall = () => useContext(CallContext);

const CallProvider = ({ children }) => {
  //! State
  const auth = useAuthentication();
  const { callingMethod } = auth;
  const [callStatus, setCallStatus] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [minimizeCall, setMinimizeCall] = useState(false);
  const [item, setItem] = useState({});
  const { open, toggle, shouldRender } = useToggleDialog();
  const [isUserConfirm, setIsUserConfirm] = useState(false);
  const { t } = useTranslation();
  const sessionRef = useRef();
  const [isIncoming, setIsIncoming] = useState(false);
  const itemRef = useRef();
  const dataLine = callServices.getLine();
  const {
    open: openModalConfirm,
    toggle: toggleModalConfirm,
    shouldRender: shouldRenderModalConfirm,
  } = useToggleDialog();

  const audioRingtone = useRef();

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        if (!isEmpty(dataLine)) {
          toggleModalConfirm();
        }
      }
    }
  }, [window.performance]);

  const queryClient = useQueryClient();

  const { mutateAsync: addLeadCall } = useAddLeadCalls();

  //! Function
  const turnOffCall = useCallback(() => {
    setIsUserConfirm(false);
    setIsCalling(false);
    setMinimizeCall(false);
    toggle();
    setCallStatus('');
  }, [toggle]);

  const terminateCall = useCallback(() => {
    //* TRICKY ALERT !!!
    //* Jssip terminate session is not working properly.
    //* So we have to use stop() instead of terminate() and then start() again
    console.log('terminate call');
    callingMethod?.stop();
    setTimeout(() => {
      callingMethod?.start();
    }, 1000);
  }, [callingMethod]);

  const startCall = useCallback(
    (phoneNumber, id) => {
      try {
        const session = callingMethod?.call(phoneNumber);
        if (session) {
          session.connection.addEventListener('addstream', addAudio);
        }
      } catch (error) {
        showError('Call failed');
      }
    },
    [callingMethod],
  );

  const endCall = useCallback(() => {
    try {
      callingMethod?.endCall();
    } catch (error) {
      showError('end call failed');
    }
  }, [callingMethod]);

  const onClickOpenAndCall = useCallback(
    async (info) => {
      const handleOpenAndCall = () => {
        setItem(info);
        itemRef.current = info;
        toggle();
        setIsCalling(true);
        startCall(info?.phoneNumber, info?._id);
        setCallStatus(t('common:calling'));
      };
      if (navigator.mediaDevices) {
        const constraints = (window.constraints = {
          audio: true,
          video: false,
        });
        try {
          await navigator.mediaDevices.getUserMedia(constraints);
          handleOpenAndCall();
        } catch (error) {
          console.log('error: ', error);
          showInfo(t('common:call_warningMicro'));
        }
      }
    },
    [startCall, setItem, toggle],
  );

  const onClickAcceptCall = useCallback(async () => {
    sessionRef.current &&
      sessionRef.current.answer({
        mediaConstraints: {
          audio: true, // only audio calls
          video: false,
        },
      });
    sessionRef.current && sessionRef.current.connection.addEventListener('addstream', addAudio);
  }, []);

  const onClickDeclineCall = useCallback(() => {
    terminateCall();
  }, [terminateCall]);

  const onClickCancelCall = useCallback(() => {
    sessionRef.current && sessionRef.current?.connection.removeEventListener('addstream', addAudio);
    terminateCall();
  }, [terminateCall]);

  const addAudio = useCallback((e) => {
    const audio = document.createElement('audio');
    audio.srcObject = e.stream;
    audio.play();
  }, []);

  const startAudioRing = useCallback(() => {
    try {
      const audio = document.createElement('audio');
      audioRingtone.current = audio;
      audio.src = AudioRing;
      // const promiseAudio = audio.play();
      // promiseAudio
      //   .then((_) => {
      //     // alert('Autoplay started');
      //     audio.play();
      //   })
      //   .catch((error) => {
      //     audio.play();
      //     alert('Bạn cần tương tác với màn trước để có âm thanh!');
      //     // Autoplay was prevented.
      //     // Show a "Play" button so that user can start playback.
      //   });
      audio.play();
    } catch (error) {
      console.log('err', error);
    }
  }, []);

  const endAudioRing = useCallback(() => {
    audioRingtone.current?.remove();
    audioRingtone.current?.pause();
  }, []);

  const initCallInstance = useCallback(() => {
    callingMethod?.ua.on('newRTCSession', function (data) {
      const { session } = data;
      sessionRef.current = session;

      const isIncoming = sessionRef.current.direction === 'incoming';

      isIncoming ? setIsIncoming(true) : setIsIncoming(false);

      const projectId = httpServices.getServiceStorage();

      sessionRef.current.on('progress', (e) => {
        console.log('progress', { e, isIncoming });
        setIsCalling(true);
        if (isIncoming) {
          startAudioRing();
          setCallStatus(t('common:incoming_call'));
          setItem({
            phoneNumber: sessionRef.current._remote_identity._display_name,
          });
          toggle();
        } else {
          setCallStatus(t('common:calling'));
        }
      });

      sessionRef.current.on('accept', (e) => {
        console.log('accept', e);
      });

      sessionRef.current.on('confirmed', (e) => {
        // this handler will be called for incoming calls too
        endAudioRing();
        console.log('confirmed', e);
        setCallStatus(t('common:call_confirmed'));
        setIsUserConfirm(true);
        showSuccess('call confirmed');
      });

      sessionRef.current.on('ended', async (e) => {
        // the call has ended
        console.log('endCall');

        const isTerminated = checkStatusCalling(e).isUserTerminated;
        setCallStatus(t('common:call_ended'));
        try {
          if (isIncoming) {
            await addLeadCall({
              type: 'inbound',
              project: projectId,
              // phoneNumber: e?.message?.from?._uri?._user,
              phoneNumber: sessionRef.current._remote_identity._display_name,
              source: dataLine.name,
            });
          } else {
            await addLeadCall({
              lead: itemRef.current?._id,
              project: projectId,
              phoneNumber: itemRef.current?.phoneNumber,
              source: dataLine.name,
              type: 'outbound',
            });
          }
        } catch (error) {
          showError(t('common:contacts_addLeadCallsFailed'));
        }
        if (isTerminated) {
          terminateCall();
          turnOffCall();
        }

        queryClient.refetchQueries([queryKeys.leads, item?._id]);
        showError('ENDED');
      });

      sessionRef.current.on('failed', async (e) => {
        // unable to establish the call
        endAudioRing();
        console.log('failed', sessionRef.current);
        const status = checkStatusCalling(e);
        setCallStatus(t(`common:${status}`));
        e._direction === 'outgoing' && terminateCall();
        if (status.isCanceled || status.isUserBusy || status.isRejected) {
          try {
            if (isIncoming) {
              await addLeadCall({
                type: 'inbound',
                project: projectId,
                // phoneNumber: e?.message?.from?._uri?._user,
                phoneNumber: sessionRef.current._remote_identity._display_name,
                source: dataLine.name,
              });
            } else {
              await addLeadCall({
                lead: itemRef.current?._id,
                project: projectId,
                phoneNumber: itemRef.current?.phoneNumber,
                source: dataLine.name,
                type: 'outbound',
              });
            }
          } catch (error) {
            showError(t('common:contacts_addLeadCallsFailed'));
          }
        }
        turnOffCall();
        showError('FAILED', e?.cause);
      });
    });
  }, [callingMethod]);

  useEffect(() => {
    initCallInstance();
  }, [initCallInstance]);

  //! Render
  const value = useMemo(() => {
    return {
      isCalling,
      setIsCalling,
      minimizeCall,
      setMinimizeCall,
      item,
      setItem,
      startCall,
      endCall,
      open,
      toggle,
      shouldRender,
      onClickCancelCall,
      onClickOpenAndCall,
      isUserConfirm,
      callStatus,
      onClickAcceptCall,
      onClickDeclineCall,
      isIncoming,
    };
  }, [
    isCalling,
    setIsCalling,
    minimizeCall,
    setMinimizeCall,
    item,
    setItem,
    startCall,
    endCall,
    open,
    toggle,
    shouldRender,
    onClickCancelCall,
    onClickOpenAndCall,
    isUserConfirm,
    callStatus,
    onClickAcceptCall,
    onClickDeclineCall,
    isIncoming,
  ]);

  return (
    <CallContext.Provider value={value}>
      {children}
      <CommonStyles.Modal
        open={openModalConfirm}
        toggle={toggleModalConfirm}
        content={
          <div style={{ padding: '0 10px', fontSize: '20px', fontWeight: '600', color: '#008638' }}>
            Accept continue
          </div>
        }
        footer={
          <React.Fragment>
            <CommonStyles.Button variant="outlined" onClick={toggleModalConfirm}>
              Accept
            </CommonStyles.Button>
          </React.Fragment>
        }
      />
    </CallContext.Provider>
  );
};

export default CallProvider;
