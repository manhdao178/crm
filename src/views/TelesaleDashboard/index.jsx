import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import Telesales from 'models/telesales.model';
import DashboardItem from 'components/DashboardItem';
import { useGetTelesaleDashboard } from 'hooks/telesale/useGetTelesaleDashboard';
import httpService from 'services/httpServices';

const useStyles = makeStyles((theme) => {
  return {
    dashboard_container: {
      display: 'flex',
      gap: '44px',
      flexWrap: 'wrap',
    },
  };
});

const TelesaleDashboard = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const user = httpService.getUserInfoStorage();
  const projectId = httpService.getServiceStorage();
  const { data, isLoading, error, refetch } = useGetTelesaleDashboard(user?.userRoleDetail?.key, projectId);

  const dashboardItem = Telesales.parseResponseTelesale(data?.data?.data);

  //! Function

  //! Render
  return (
    <div className={classes.dashboard_container}>
      {dashboardItem.map((item) => {
        return <DashboardItem data={item} key={item.title} />;
      })}
    </div>
  );
};

export default TelesaleDashboard;
