import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik } from 'formik';
import useFilters from 'hooks/useFilters';
import useToggleDialog from 'hooks/useToggleDialog';
import { showError, showSuccess } from 'helpers/toast';
import { useGetADSToday } from 'hooks/report/useGetADSToday';
import httpServices from 'services/httpServices';

const useStyles = makeStyles((theme) => {
  return {};
});

const project = httpServices.getServiceStorage();

const initialFilters = {
  project: project,
};

const AdsDailyReport = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { filters, handleChangePage, handleSelect } = useFilters(initialFilters);

  const { data: dataAdsToday } = useGetADSToday(filters);
  const data = dataAdsToday?.data?.data;
  const paging = dataAdsToday?.data?.data.length;

  const columns = [
    {
      label: `${t('common:ads_service')}`,
      id: 'services',
      Cell: (row) => <div>{row?.service?.name}</div>,
    },
    {
      label: `${t('common:ads_ADSCost')}`,
      id: 'ADSCost',
      Cell: (row) => <div>{row?.totalAdsAmountSpent + ' đ'}</div>,
    },
    {
      label: `${t('common:ads_schedule')}`,
      id: 'schedule',
      Cell: (row) => <div>{row?.totalAppointments}</div>,
    },
    {
      label: `${t('common:ads_client')}`,
      id: 'client',
      Cell: (row) => <div>{row?.totalCustomer}</div>,
    },
    {
      label: `${t('common:ads_revenue')}`,
      id: 'revenue',
      Cell: (row) => <div>{row?.totalIncome + ' đ'}</div>,
    },
    {
      label: `${t('common:ads_turnover')}`,
      id: 'turnover',
      Cell: (row) => <div>{row?.incomeRate % 1 === 0 ? row?.incomeRate : row?.incomeRate.toFixed(2) + ' %'}</div>,
    },
  ];

  //! Function

  //! Render
  return (
    <Formik>
      {(props) => {
        return (
          <Form style={{ marginBottom: '50px' }}>
            <CommonStyles.Content>
              <CommonStyles.Table
                filters={filters}
                data={data}
                columns={columns}
                total={paging}
                // maxPage={paging?.totalPage}
                // hasCheckbox={true}
                handleChangePage={handleChangePage}
                // handleSelect={handleSelect}
                // handleSelectAll={handleSelectAll}
              />
            </CommonStyles.Content>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdsDailyReport;
