import React, { memo } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
import { LEADS_URL } from 'constants/api';
import httpServices from 'services/httpServices';
import useFilters from 'hooks/useFilters';
import { useGetAppointmentMy } from 'hooks/appointment/useGetAppointmentMy';
import moment from 'moment';
import { useGetLeadAppointment } from 'hooks/leads/useGetAppointment';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import { useGetDataLeadsManage } from 'hooks/leads/useGetDataLeadsManage';
import { useGetDataLeads } from 'hooks/leads/useGetDataLeads';
import { useGetLeadAppointmentManage } from 'hooks/appointment/useGetLeadAppointmentManage';

const useStyles = makeStyles((theme) => {
  return {
    buttonValue: {
      color: 'rgba(21, 20, 57, 0.7) !important',
      background: `${theme.custom.colors.white} !important`,
      border: `1px solid ${theme.custom.colors.lightgreen} !important`,
    },
    active: {
      background: `${theme.custom.colors.green} !important`,
      color: `${theme.custom.colors.white} !important`,
    },
  };
});

const today = new Date();
const startDate = moment().startOf('month').format('YYYY-MM-DD');
const endDate = moment().endOf('month').format('YYYY-MM-DD');
const startDateOfLastMonth = moment(new Date(today.getFullYear(), today.getMonth() - 1, 1)).format('YYYY-MM-DD');

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: 'desc',
  startDate: startDateOfLastMonth,
  endDate: endDate,
  project: httpServices.getServiceStorage(),
};

const TabButton = ({ item, status, paging }) => {
  //! State
  const classes = useStyles();
  const { tabPageLead } = useContactPageLead();
  const { t } = useTranslation();
  const filter = status === 'FINISHED' ? { ...initialFilters, search: { status: 'FINISHED' } } : initialFilters;
  const { data: resAppointmentMyList, refetch } =
    tabPageLead === 'personal' ? useGetAppointmentMy(filter) : useGetLeadAppointmentManage(filter);
  const pagingAppointmentMy = resAppointmentMyList?.data?.data?.paging?.total || 0;

  let statusCount = 0;
  if (status === 'Booked') statusCount = pagingAppointmentMy || 0;
  if (status === 'NEW') statusCount = paging?.totalNew || 0;
  if (status === 'POTENTIAL') statusCount = paging?.totalPotential || 0;
  if (status === 'UNPROMISING') statusCount = paging?.totalUnpromising || 0;
  if (status === '') statusCount = paging?.totalAll || 0;
  if (item.value === 'isInTakeCare') statusCount = paging?.totalInTakeCare || 0;
  if (status === 'FINISHED') statusCount = pagingAppointmentMy || 0;

  //! Function

  //! Render
  return (
    <CommonStyles.Button
      onClick={item.onClick}
      disabled={item.disabled}
      className={classNames(classes.buttonValue, { [classes.active]: item.isActive })}
    >
      {item.label}
      {` (${statusCount})`}
    </CommonStyles.Button>
  );
};

export default memo(TabButton);
