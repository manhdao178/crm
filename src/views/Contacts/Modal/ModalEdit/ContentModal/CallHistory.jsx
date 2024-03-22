import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import SimpleBarReact from 'simplebar-react';

import 'simplebar/src/simplebar.css';
import { CircularProgress, Grid } from '@mui/material';
import ItemCallHistory from './ItemCallHistory';
import { useGetHistoryCall } from 'hooks/leads/useGetHistoryCall';
import CommonStyles from 'components/CommonStyles';
import { Box } from '@mui/system';
import Empty from 'assets/IconsSVG/UserList/Empty.svg';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => {
  return {
    emptyTable: {
      width: '100%',
      height: '400px',
      backgroundImage: `url(${Empty})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '55%',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginBottom: '20px',
    },
  };
});

const CallHistory = ({ id, phoneNumber }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const { data: responseHistoryCall, isLoading: getHistoryCallLoading } = useGetHistoryCall(
    { lead: id },
    { enabled: !!id },
  );
  const HistoryCallData =
    // responseHistoryCall?.data?.data?.data.filter((item) => item?.duration > 0 && item?.recording) || [];
    responseHistoryCall?.data?.data?.data || [];

  //! Function
  if (getHistoryCallLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (isEmpty(HistoryCallData)) {
    return (
      <Box className={classes.emptyTable}>
        <CommonStyles.Typography variant="h4" component="h4">
          {t('common:table_noData')}
        </CommonStyles.Typography>
      </Box>
    );
  }

  //! Render
  return (
    <SimpleBarReact style={{ maxHeight: '70vh' }}>
      {HistoryCallData.map((item) => {
        return <ItemCallHistory key={item._id} item={item} phoneNumber={phoneNumber} />;
      })}
    </SimpleBarReact>
  );
};

export default CallHistory;
