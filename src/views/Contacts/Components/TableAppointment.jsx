import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { showError, showSuccess } from 'helpers/toast';
import { useEditAppointment } from 'hooks/appointment/useEditAppointment';
import { useGetAppointment } from 'hooks/appointment/useGetAppointment';
import { useGetAppointmentMy } from 'hooks/appointment/useGetAppointmentMy';
import { useGetLeadAppointmentManage } from 'hooks/appointment/useGetLeadAppointmentManage';
import useFilters from 'hooks/useFilters';
import { isEmpty } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import httpServices from 'services/httpServices';
import CellEditAppoitment from '../Cell/CellEditAppoitment';
import HeadLabel from '../Head/HeadLabel';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .top-content': {
        marginBottom: '8px',
        '& .header-content-search': {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          '& .btn-back': {
            backgroundColor: theme.custom.colors.gray,
            padding: '13px 16px',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: theme.custom.colors.grayborder,
            },
          },
        },
        '& .header-content': {
          display: 'flex',
          justifyContent: 'space-between',
          '& .left': {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            '& .btn-back': {
              backgroundColor: theme.custom.colors.gray,
              padding: '13px 16px',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: theme.custom.colors.grayborder,
              },
            },
          },
          '& .right': {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            '& .btn-back': {
              backgroundColor: theme.custom.colors.gray,
              padding: '8px 8px',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: theme.custom.colors.grayborder,
              },
            },
          },
        },
      },
    },
    headerText: {
      color: theme.custom.colors.darkgray,
    },
  };
});

const TableAppointment = ({ searchText, checkFinish }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { tabPageLead } = useContactPageLead();

  const optionStatus = [
    { label: 'Khách đã hẹn', value: 'IN_PROCESS' },
    { label: 'Khách đã đến', value: 'FINISHED' },
    { label: 'Huỷ', value: 'CANCELLED' },
  ];

  const columns = [
    {
      label: <HeadLabel label="appointment_time" title="date" isAppointment />,
      id: 'date',
    },
    {
      label: <HeadLabel label="appointment_customerName" title="name" isAppointment />,
      id: 'name',
    },
    {
      label: 'Giới tính',
      id: 'gender',
    },
    {
      label: <HeadLabel label="appointment_phoneNumber" title="phoneNumber" isAppointment />,
      id: 'phoneNumber',
    },
    {
      label: <HeadLabel label="appointment_service" title="services" isAppointment />,
      id: 'service',
    },
    {
      label: <HeadLabel label="appointment_branch" title="branch" isAppointment />,
      id: 'branch',
    },
    {
      label: <HeadLabel label="appointment_telesale" title="telesales" isAppointment />,
      id: 'telesale',
    },
    {
      label: 'Ghi chú',
      id: 'note',
    },
    {
      label: <HeadLabel label="appointment_status" title="status" isAppointment />,
      id: 'status',
      Cell: (row) => {
        return (
          <Box>
            <CommonStyles.SelectInput
              options={optionStatus}
              value={row.status}
              onChange={(e) => handleSelectStatus(e.target.value, row.id)}
              disabled={checkFinish}
            />
          </Box>
        );
      },
    },
    {
      label: '',
      id: 'tableAction',
      Cell: (row) => {
        if (!checkFinish) return <CellEditAppoitment item={row} />;
      },
    },
  ];

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
  const { filterTableAppointment } = useContactPageLead();
  const { filters, setFilters, handleChangePage, handleSelect, handleSelectAll, handleSearch } =
    useFilters(initialFilters);
  const { isLoading: editingAppointment, mutateAsync: editAppointment } = useEditAppointment();
  const {
    data: resAppointmentMyList,
    isLoading,
    error,
    refetch,
  } = tabPageLead === 'personal' ? useGetAppointmentMy(filters) : useGetLeadAppointmentManage(filters);
  const dataAppointment = resAppointmentMyList?.data?.data?.data || [];
  const paging = resAppointmentMyList?.data?.data?.paging;

  const dataConvert = dataAppointment?.map((item) => ({
    id: item?._id,
    date: moment(item?.date).format('DD/MM/YYYY HH:mm:ss'),
    name: item?.leadDetail?.fullname,
    gender: item?.leadDetail?.gender === 0 ? 'Nam' : 'Nữ',
    phoneNumber: item?.leadDetail?.phoneNumber,
    service: item?.serviceDetail?.name,
    branch: item?.branchDetail?.name,
    telesale: item?.telesale?.assigneeDetail?.fullname,
    status: item?.status,
    note: item?.note,
    detail: item,
  }));

  //! Function

  const handleSelectStatus = async (value, id) => {
    try {
      await editAppointment({ id: id, status: value });
      await refetch();
      showSuccess(t('common:appointment_editStatusSuccess'));
    } catch (error) {
      showError(t('common:appointment_editStatusError'));
    }
  };

  useEffect(() => {
    handleSearch('searchText')(searchText);
  }, [searchText]);

  useEffect(() => {
    const filterConvert = {
      fullname: filterTableAppointment.name,
      date: filterTableAppointment.date,
      phoneNumber: filterTableAppointment.phoneNumber,
      services: filterTableAppointment.services ? filterTableAppointment.services.map((item) => item.value) : '',
      branches: filterTableAppointment.branch ? filterTableAppointment.branch.map((item) => item.value) : '',
      telesales: isEmpty(filterTableAppointment.telesales)
        ? ''
        : filterTableAppointment.telesales.map((item) => item.value),
      status: filterTableAppointment.status,
    };

    setFilters((prev) => ({ ...prev, search: { ...filterConvert, status: checkFinish ? 'FINISHED' : '' } }));
  }, [filterTableAppointment, checkFinish]);

  //! Render
  return (
    <div className={classes.root}>
      <CommonStyles.Table
        filters={filters}
        data={dataConvert}
        columns={columns}
        maxPage={paging?.totalPage}
        total={paging?.total}
        handleChangePage={handleChangePage}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default TableAppointment;
