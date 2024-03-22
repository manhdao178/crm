import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { showError, showSuccess } from 'helpers/toast';
import { useEditAppointment } from 'hooks/appointment/useEditAppointment';
import { useGetAppointment } from 'hooks/appointment/useGetAppointment';
import useFilters from 'hooks/useFilters';
import moment from 'moment';
import 'moment/locale/vi';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import httpServices from 'services/httpServices';

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

const TableAppointment = ({ date, handleBack, searchText }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const optionStatus = [
    { label: 'IN_PROCESS', value: 'IN_PROCESS' },
    { label: 'FINISHED', value: 'FINISHED' },
    { label: 'CANCELLED', value: 'CANCELLED' },
  ];

  const columns = [
    {
      label: `${t('common:appointment_time')}`,
      id: 'date',
    },
    {
      label: `${t('common:data_name')}`,
      id: 'name',
    },
    {
      label: `${t('common:appointment_gender')}`,
      id: 'gender',
    },
    {
      label: `${t('common:data_numberPhone')}`,
      id: 'phoneNumber',
    },
    {
      label: `${t('common:service')}`,
      id: 'service',
    },
    {
      label: 'Telesale',
      id: 'telesale',
    },
    {
      label: `${t('common:data_note')}`,
      id: 'note',
    },
    {
      label: `${t('common:appointment_status')}`,
      id: 'status',
      Cell: (row) => {
        return (
          <Box>
            <CommonStyles.SelectInput
              options={optionStatus}
              value={row.status}
              onChange={(e) => handleSelectStatus(e.target.value, row.id)}
            />
          </Box>
        );
      },
    },
  ];

  const initialFilters = {
    page: 1,
    pageSize: 10,
    sort: 'desc',
    date: date,
  };
  const { filters, setFilters, handleChangePage, handleSelect, handleSelectAll, handleSearch } =
    useFilters(initialFilters);

  const { isLoading: editingAppointment, mutateAsync: editAppointment } = useEditAppointment();

  const { data: resAppointmentList, isLoading, error, refetch } = useGetAppointment(filters);
  const dataAppointment = resAppointmentList?.data?.data?.data || [];
  const paging = resAppointmentList?.data?.data?.paging;

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        project: httpServices.getServiceStorage(),
      };
    });
  }, []);

  const dataConvert = dataAppointment?.map((item) => ({
    id: item?._id,
    date: moment(item?.date).format(searchText ? 'DD/MM/YYYY HH:mm:ss' : 'HH:mm:ss'),
    name: item?.leadDetail?.fullname,
    gender: item?.leadDetail?.gender === 0 ? 'Nam' : 'Nữ',
    phoneNumber: item?.leadDetail?.phoneNumber,
    service: item?.leadDetail?.serviceDetail?.name,
    telesale: item?.telesale?.assigneeDetail?.fullname || 'Chưa được chia',
    note: item?.note,
    status: item?.status,
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

  //! Render
  return (
    <div className={classes.root}>
      <Box className="top-content">
        {!date ? (
          <div className="header-content-search">
            <CommonStyles.Button className="btn-back" onClick={() => handleBack()}>
              <CommonIcons.Back />
            </CommonStyles.Button>
            <span className={classes.headerText}>{t('common:appointment_titleSearchBy')}</span>
            <span> {searchText}</span>
          </div>
        ) : (
          <div className="header-content">
            <div className="left">
              <CommonStyles.Button className="btn-back" onClick={() => handleBack()}>
                <CommonIcons.Back />
              </CommonStyles.Button>
              <span className={classes.headerText}>
                {t('common:appointment_total')} {paging?.total}
              </span>
            </div>
            <div className="right">
              <span>Ngày {moment(date).locale('vi').format('LL')}</span>
              <CommonStyles.Button className="btn-back">
                <CommonIcons.Calendar style={{ color: 'black' }} />
              </CommonStyles.Button>
            </div>
          </div>
        )}
      </Box>
      <CommonStyles.Table
        filters={filters}
        data={dataConvert}
        columns={columns}
        maxPage={paging?.totalPage}
        total={paging?.total}
        handleChangePage={handleChangePage}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
        maxHeight="555px"
      />
    </div>
  );
};

export default TableAppointment;
