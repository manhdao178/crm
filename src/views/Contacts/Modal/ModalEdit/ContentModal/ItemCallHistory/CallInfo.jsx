import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Grid } from '@mui/material';
import moment from 'moment';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {
    renderItem: {
      display: 'flex',
      gap: '8px',
    },
    renderDate: {
      color: theme.custom.colors.lightblue,
    },
    renderTime: {
      color: theme.custom.colors.black,
      fontWeight: 600,
    },
    renderTypeCall: {
      background: '#FFF0F0',
      color: theme.custom.colors.red,
      fontWeight: 600,
      padding: '2px 6px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
    },
  };
});

const CallInfo = ({ callDate, callTime, callFrom, callTo, typeCall, source, billSec, status }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const [duration, setDuration] = useState(billSec || 0);

  //! Function
  useEffect(() => {
    const au = document.createElement('audio');
    if (!!source) {
      au.src = BASE_IMAGE + source;
      au.addEventListener(
        'loadedmetadata',
        function () {
          // const duration = au.duration;
          if (au.duration > 0) setDuration(Math.floor(au.duration));
        },
        false,
      );
    } else {
      setDuration(0);
    }
  }, []);

  //! Render
  return (
    <Grid container spacing={2} mb={2}>
      <Grid className={classes.renderItem} item xs={7}>
        <span>{t('common:contacts_callDate')}:</span>
        <span className={classes.renderDate}>{callDate}</span>
      </Grid>
      <Grid className={classes.renderItem} item xs={5}>
        <span>{t('common:contacts_callTime')}:</span>
        {/* <span className={classes.renderTime}>{moment.utc(callTime * 1000).format('HH:mm:ss')}</span> */}
        <span className={classes.renderTime}>{moment.utc(duration * 1000).format('HH:mm:ss')}</span>
      </Grid>
      {/*  */}
      <Grid className={classes.renderItem} item xs={7}>
        <span className={classes.renderTypeCall}>{typeCall}</span>
      </Grid>
      {status && (
        <Grid className={classes.renderItem} item xs={5}>
          <span>Trạng thái:</span>
          <span className={classes.renderTime}>{status}</span>
        </Grid>
      )}
      <Grid className={classes.renderItem} item xs={7}>
        <span>{t('common:contacts_callFrom')}:</span>
        <span className={classes.renderTime}>{callFrom}</span>
      </Grid>
      <Grid className={classes.renderItem} item xs={5}>
        <span>{t('common:contacts_callTo')}:</span>
        <span className={classes.renderTime}>{callTo}</span>
      </Grid>
    </Grid>
  );
};

export default CallInfo;
