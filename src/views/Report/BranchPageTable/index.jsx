import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { useGetContactQuality } from 'hooks/report/useGetContactQuality';
import httpServices from 'services/httpServices';
import { Box } from '@mui/material';
import Filters from './Filters';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useGetStatisticPagelead } from 'hooks/report/useGetStatisticPagelead';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      paddingLeft: '20px',
    },
  };
});

const BranchPageTable = ({ filterValues, status }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const initialFilters = {
    page: 1,
    pageSize: 10,
    sort: 'desc',
  };

  const project = httpServices.getServiceStorage();
  const valueConvert = {
    project: project,
    startDate: moment(filterValues?.from).toISOString(),
    endDate: moment(filterValues?.to).toISOString(),
    branch: filterValues?.branch?.value || '',
    user: filterValues?.employee?.value || '',
    service: filterValues?.service?.value || '',
  };
  const { isLoading, data: resTable } = useGetStatisticPagelead(valueConvert, status);
  const data = resTable?.data?.data?.data || [];

  const columns = [
    { label: 'Service', id: 'service', Cell: (row) => <Box>{row?.service?.name}</Box> },
    { label: 'Total data', id: 'totalData' },
    { label: 'Total phone number', id: 'totalDataWithPhoneNumber' },
    { label: 'Total valid phone number', id: 'totalDataWithValidPhoneNumber' },
    { label: 'Rate', id: 'rate', Cell: (row) => <Box> {Number(row?.rate.toFixed(2))} %</Box> },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Content>
      <CommonStyles.Typography variant="h4" component="h4" className={classes.title}>
        {/* Báo cáo theo tháng */}
      </CommonStyles.Typography>

      {/* <Filters /> */}
      <CommonStyles.Table data={data} columns={columns} filters={initialFilters} isLoading={isLoading} />
    </CommonStyles.Content>
  );
};

export default BranchPageTable;
