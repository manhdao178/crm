import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Fragment } from 'react';
import { Formik } from 'formik';
import HeadLabel from 'views/Services/Head/HeadLabel';
import FormSearch from './Components/FormSearch';
import useFilters from 'hooks/useFilters';
import { Box, Switch, Tooltip } from '@mui/material';
import httpServices from 'services/httpServices';
import { useGetTelesaleStatus } from 'hooks/telesale/useGetTelesaleStatus';
import { useTelesaleStatus } from 'hooks/telesale/useEditTelesaleStatus';
import { showError, showSuccess } from 'helpers/toast';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {
    username: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'left',
      width: '200px',
    },
    avatarWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    avatar: {
      minWidth: '26px',
      height: '26px',
      borderRadius: '50%',
      backgroundColor: '#fdd145',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    name: {
      flex: 2,
      display: 'flex',
      justifyContent: 'flex-start',
      fontSize: '14px',
      fontWeight: '600',
      color: '#434E74',
      lineheight: '14px',
    },
  };
});

const TelesaleManage = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const project = httpServices.getServiceStorage();
  const initialFilters = {
    page: 1,
    pageSize: 10,
    sort: 'desc',
    project: project,
  };

  const { filters, handleChangePage, handleSearch } = useFilters(initialFilters);

  const { data: resData, refetch } = useGetTelesaleStatus(filters);
  const data = resData?.data?.data?.data || [];
  const branches = resData?.data?.data?.branches || [];
  const paging = resData?.data?.data?.paging;

  const { isLoading, mutateAsync: editTeleStatus } = useTelesaleStatus();
  const handleEditTeleStatus = async (id, status) => {
    try {
      await editTeleStatus({ id: id, enable: !status });
      refetch();
      showSuccess('Sửa trạng thái thành công');
    } catch (error) {
      console.log('error: ', error);
      showError('Có lỗi xảy ra');
    }
  };

  const columns = [
    {
      label: <HeadLabel label="userlist_staffCode" />,
      id: 'staffCode',
    },
    {
      label: `${t('common:userlist_fullName')}`,
      id: 'fullname',
      Cell: (row) => {
        return (
          <Box className={classes.username}>
            <Box className={classes.avatarWrapper}>
              <Box
                className={classes.avatar}
                style={{
                  backgroundImage: `url(${
                    row.avatar ? BASE_IMAGE + row.avatar : 'https://i.stack.imgur.com/l60Hf.png'
                  })`,
                }}
              />
            </Box>
            <Box className={classes.name}>{row?.fullname}</Box>
          </Box>
        );
      },
    },
    {
      label: 'Email',
      id: 'email',
    },
    ...branches.map((item) => ({
      label: item.name,
      id: item.id,
      Cell: (row) => {
        const branchSwitch = row?.branchStatuses.find((ele) => item.id === ele.branch);
        if (!!branchSwitch) {
          return (
            <Switch
              // disabled={isLoading}
              checked={branchSwitch?.enable}
              onChange={() => handleEditTeleStatus(branchSwitch?.id, branchSwitch?.enable)}
            />
          );
        }
        return null;
      },
    })),
  ];

  //! Function

  //! Render
  return (
    <Fragment>
      <FormSearch handleSearch={handleSearch} />
      <CommonStyles.Content>
        <CommonStyles.Table
          filters={filters}
          data={data}
          maxPage={paging?.totalPage}
          total={paging?.total}
          columns={columns}
          handleChangePage={handleChangePage}
          countSticky={3}
        />
      </CommonStyles.Content>
    </Fragment>
  );
};

export default TelesaleManage;
