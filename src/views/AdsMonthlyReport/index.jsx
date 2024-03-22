import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Fragment } from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import ChartKPI from './ChartKPI';
import ChartTurnover from './ChartTurnover';
import ListUser from './ListUser';
import HorizonBar from './HorizontalBar';
import BigCalendar from './Calendar/BigCalendar';
import CalendarReport from './Calendar';
import useFilters from 'hooks/useFilters';
import { useGetADSMonth } from 'hooks/report/useGetADSMonth';
import httpServices from 'services/httpServices';

const useStyles = makeStyles((theme) => {
  return {
    boxCharKPI: {
      border: '1px solid #ccc',
    },
    boxCharTurnover: {
      border: '1px solid #ccc',
      padding: '0 10px',
    },
    wrapperListCarl: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
    },
    listUser: {
      maxWidth: '34%',
      marginRight: '15px',
    },
    calendar: {
      flex: 1,
    },
    wrapperHorizon: {
      border: '1px solid #ccc',
      marginTop: '15px',
      padding: '0 10px',
    },
  };
});

const project = httpServices.getServiceStorage();

const AdsMonthlyReport = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    project: project,
    date: new Date(),
  });

  const { data: dataAdsMonth, isLoading, refetch } = useGetADSMonth(filter);
  const dataConvert = dataAdsMonth?.data?.data;

  //! Function

  //! Render
  return (
    <Fragment>
      <CommonStyles.Content>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box className={classes.boxCharKPI}>
                <ChartKPI data={dataConvert?.kpiStatistics} />
              </Box>
              <Box className={classes.wrapperListCarl}>
                <Box className={classes.listUser}>
                  <ListUser data={dataConvert?.customerStatistics} />
                </Box>
                <Box className={classes.calendar}>
                  <CalendarReport data={dataConvert?.appointmentStatistics} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.boxCharTurnover}>
                <ChartTurnover data={dataConvert?.incomeStatistics} />
              </Box>
              <Box className={classes.wrapperHorizon}>
                <HorizonBar filter={filter} setFilter={setFilter} data={dataConvert?.adsAmountSpentStatistics} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CommonStyles.Content>
    </Fragment>
  );
};

export default AdsMonthlyReport;
