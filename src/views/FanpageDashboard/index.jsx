import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import DashboardItem from 'components/DashboardItem';
import Ratio from 'assets/IconsSVG/FanpageDashboard/Ratio.svg';
import TotalData from 'assets/IconsSVG/FanpageDashboard/TotalData.svg';
import TotalPhoneNumber from 'assets/IconsSVG/FanpageDashboard/TotalPhoneNumber.svg';
import { useGetDataFanpageAdmin } from 'hooks/leads/useGetDataFanpageAdmin';
import httpServices from 'services/httpServices';

const useStyles = makeStyles((theme) => {
  return {
    dashboard_container: {
      display: 'flex',
      gap: '44px',
      flexWrap: 'wrap',
    },
  };
});

const FanpageDashboard = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const projectId = httpServices.getServiceStorage();
  const { data: dataFanpageAdmin, loading } = useGetDataFanpageAdmin(projectId);
  const dataConvert = dataFanpageAdmin?.data?.data;

  const data = [
    {
      id: '1',
      title: 'Total data',
      value: dataConvert?.data?.total,
      change: dataConvert?.data?.change,
      icon: TotalData,
    },
    {
      id: '2',
      title: 'Total phone number',
      value: dataConvert?.phoneNumber?.total,
      change: dataConvert?.phoneNumber?.change,
      icon: TotalPhoneNumber,
    },
    {
      id: '3',
      title: 'Ratio',
      value: dataConvert?.conversionRate?.total,
      change: dataConvert?.conversionRate?.change,
      icon: Ratio,
    },
  ];
  //! Function

  //! Render
  return (
    <div className={classes.dashboard_container}>
      {data.map((item) => {
        return <DashboardItem data={item} key={item.id} />;
      })}
    </div>
  );
};

export default FanpageDashboard;
