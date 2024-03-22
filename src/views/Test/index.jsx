import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import useFilters from 'hooks/useFilters';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

//option selectInput

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .top-content': {
        marginBottom: '8px',
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

const Test = () => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const optionStatus = [
    { label: 'Dang tien hanh', value: '1' },
    { label: 'Da hoan thanh', value: '2' },
    { label: 'Huy', value: '3' },
  ];

  const data = [
    {
      id: 1,
      time: '1/1/1',
      name: 'Manhmanh',
      gender: 'Nam',
      phoneNumber: '0123445666',
      service: 'Gội đầu',
      telesale: 'Luanluan',
      status: '2',
    },
    {
      id: 2,
      time: '1/1/1',
      name: 'Manhmanh',
      gender: 'Nam',
      phoneNumber: '0123445666',
      service: 'Gội đầu',
      telesale: 'Luanluan',
      status: '3',
    },
    {
      id: 3,
      time: '1/1/1',
      name: 'Manhmanh',
      gender: 'Nam',
      phoneNumber: '0123445666',
      service: 'Gội đầu',
      telesale: 'Luanluan',
      status: '1',
    },
    {
      id: 4,
      time: '1/1/1',
      name: 'Manhmanh',
      gender: 'Nam',
      phoneNumber: '0123445666',
      service: 'Gội đầu',
      telesale: 'Luanluan',
      status: '1',
    },
  ];
  const columns = [
    {
      label: 'Khung giờ',
      id: 'time',
    },
    {
      label: 'Tên khách hàng',
      id: 'name',
    },
    {
      label: 'Giới tính',
      id: 'gender',
    },
    {
      label: 'Số điện thoại',
      id: 'phoneNumber',
    },
    {
      label: 'Dịch vụ',
      id: 'service',
    },
    {
      label: 'Telesale',
      id: 'telesale',
    },
    {
      label: 'Tình trạng',
      id: 'status',
      Cell: (row) => {
        return (
          <Box>
            <CommonStyles.SelectInput
              options={optionStatus}
              defautValue={row.status}
              onChange={(e) => console.log('e.target.value: ', e.target.value)}
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
  };
  const { filters, rowsSelected, handleChangePage, handleSelect, handleSelectAll, handleRequestSort } =
    useFilters(initialFilters);

  //! Render
  return (
    <div className={classes.root}>
      abc
      <CommonStyles.Content>
        <Box className="top-content">
          {/* <span className={classes.headerText}>{t('common:appointment_titleSearchBy')}</span> */}
          <div className="header-content">
            <div className="left">
              <CommonStyles.Button className="btn-back">
                <CommonIcons.Back />
              </CommonStyles.Button>
              <span className={classes.headerText}>{t('common:appointment_total')}</span>
            </div>
            <div className="right">
              <span>Ngày 16, tháng 12 năm 2022</span>
              <CommonStyles.Button className="btn-back">
                <CommonIcons.Calendar style={{ color: 'black' }} />
              </CommonStyles.Button>
            </div>
          </div>
        </Box>
        <CommonStyles.Table
          filters={filters}
          data={data}
          columns={columns}
          handleChangePage={handleChangePage}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
        />
      </CommonStyles.Content>
    </div>
  );
};

export default Test;
