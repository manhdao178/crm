import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { useGetContactQuality } from 'hooks/report/useGetContactQuality';
import httpServices from 'services/httpServices';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {};
});

const QualityTable = ({ filterValues, status }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const initialFilters = {
    page: 1,
    pageSize: 10,
    sort: 'desc',
  };

  const convertValueFilter = {
    user: filterValues?.employee?.value || '',
    branch: filterValues?.branch?.value || '',
    service: filterValues?.service?.value || '',
    from: filterValues?.from || '',
    to: filterValues?.to || '',
  };
  const project = httpServices.getServiceStorage();
  const { isLoading, data: resDataStatistic } = useGetContactQuality(
    { ...convertValueFilter, project: project },
    status,
  );
  const sumData = resDataStatistic?.data?.data?.sum || {};
  const data = resDataStatistic?.data?.data?.data?.concat({ ...sumData, service: { name: 'Tổng số' } }) || [];

  const columns = [
    { label: 'Service', id: 'service', Cell: (row) => <Box>{row?.service?.name}</Box> },
    { label: 'Phone number', id: 'contactCount' },
    { label: 'Date appointment', id: 'dateAppointmentCount' },
    { label: 'After date appointment', id: 'afterDateAppointmentCount' },
    { label: 'After date all appointment', id: 'afterDateAllAppointmentCount' },
    { label: 'Arrange contact', id: 'arrangeContactCount' },
    { label: 'Bad contact', id: 'badContactCount' },
    { label: 'Unreached contact', id: 'unreachedContactCount' },
    { label: 'Far contact', id: 'farContactCount' },
    {
      label: 'Appointment rate',
      id: 'appointmentRate',
      Cell: (row) => <Box>{Number(row.appointmentRate.toFixed(2))} %</Box>,
    },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Content>
      <CommonStyles.Table data={data} columns={columns} isLoading={isLoading} filters={initialFilters} />
    </CommonStyles.Content>
  );
};

export default QualityTable;
