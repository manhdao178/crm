import { CircularProgress, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { roles } from 'constants';
import { useGetReportDashboard } from 'hooks/report/useGetReportDashboard';
import Report from 'models/report.model';
import React from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import httpServices from 'services/httpServices';
import GraphByPhone from '../GraphByPhone';
import ScaleGraph from '../ScaleGraph';
import SummaryItem from '../SummaryItem';

const useStyles = makeStyles((theme) => {
  return {
    SummaryIndexContainer: {
      marginTop: 30,
    },
    paper: {
      backgroundColor: theme.custom.colors.black,
    },

    graphContainer: {
      marginTop: 50,
      display: 'flex',
      width: '100%',
      gap: 20,
    },
    scaleGraphContainer: {
      flex: 1,
    },
    phoneGraphContainer: {
      flex: 1,
    },
    loading: {
      width: '70px !important',
      height: '70px !important',
    },
    loadingContainer: {
      marginTop: 50,
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
  };
});

const SummaryIndex = (props) => {
  //! Define
  const { filters, values, roleUser } = props;
  const convertValueFilter = {
    ...values,
    employee: values?.employee?.value || '',
    branch: values?.branch?.value || '',
    service: values?.service?.value || '',
  };

  const typeReport = filters?.status;
  const classes = useStyles();
  const { t } = useTranslation();
  const projectId = httpServices.getServiceStorage();
  const { data, isLoading, isSuccess } = useGetReportDashboard(typeReport, convertValueFilter, projectId);
  const filterTabItem = data?.data?.data?.overviewStatistic;
  //! Functions

  const dashboardItem = useMemo(() => {
    if (roleUser === roles.TELESALE_LEAD || roleUser === roles.TELESALE) {
      return Report.parseResponseReportTelesale(filterTabItem);
    }
    if (roleUser === roles.PAGE_LEAD || roleUser === roles.FANPAGE) {
      return Report.parseResponseReportPageLead(filterTabItem);
    }
    return [];
  }, [filterTabItem]);

  const scaleGraphData = useMemo(() => {
    if (roleUser === roles.TELESALE_LEAD || roleUser === roles.TELESALE) {
      return data?.data?.data?.conversionRateStatistic;
    }
    if (roleUser === roles.PAGE_LEAD || roleUser === roles.FANPAGE) {
      return data?.data?.data?.dataHasPhoneNumberStatistic;
    }
    return [];
  }, [data?.data?.data]);

  const phoneGraphData = useMemo(() => {
    if (roleUser === roles.TELESALE_LEAD || roleUser === roles.TELESALE) {
      return data?.data?.data?.contactAssignStatistic;
    }
    if (roleUser === roles.PAGE_LEAD || roleUser === roles.FANPAGE) {
      return data?.data?.data?.dataStatistic;
    }
    return [];
  }, [data?.data?.data]);

  //! Render
  return (
    <Box className={classes.SummaryIndexContainer}>
      {isLoading ? (
        <Box className={classes.loadingContainer}>
          <CircularProgress className={classes.loading} />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={2}>
            {dashboardItem.map((item) => {
              return (
                <Grid item xs={12} md key={item.title}>
                  <SummaryItem data={item} key={item.title} />
                </Grid>
              );
            })}
          </Grid>
          <Box className={classes.graphContainer}>
            <Box className={classes.scaleGraphContainer}>
              <ScaleGraph scaleGraphData={scaleGraphData} isSuccess={isSuccess} />
            </Box>
            <Box className={classes.phoneGraphContainer}>
              <GraphByPhone phoneGraphData={phoneGraphData} isSuccess={isSuccess} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SummaryIndex;
