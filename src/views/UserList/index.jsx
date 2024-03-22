import React, { useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box } from '@mui/system';
import { Form, Formik, Field } from 'formik';
import { InputAdornment, Tooltip } from '@mui/material';
import SelectField from 'components/CustomField/SelectField';
import Sort from 'assets/IconsSVG/UserList/Sort.svg';
import useFilters from 'hooks/useFilters';
import CellActions from './Cells/CellActions';
import InputField from 'components/CustomField/InputField';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddUser from './Dialog/DialogAddUser';
import { useGetListUsers } from 'hooks/users/useGetListUsers';
import { showError } from 'helpers/toast';
import { useAddUsers } from 'hooks/users/useAddUser';
import { showInfo } from 'helpers/toast';
import { useEditUser } from 'hooks/users/useEditUser';
import { useDeleteUser } from 'hooks/users/useDeleteUser';
import { getBranchesNames, toAcronym } from 'helpers/userlistHelpers';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {
    userlist_header: {
      width: '100%',
      height: '56px',
      display: 'flex',
      gap: '12px',
      '& .search_container': {
        width: '50%',
        backgroundColor: theme.custom.colors.white,
        borderRadius: '12px',
        [theme.breakpoints.down('md')]: {
          width: '90%',
        },
        '& .search_box': {
          width: '100%',
          '& input': {
            height: '32px',
          },
        },
      },
      '& .select_container': {
        borderRadius: '12px',
        backgroundColor: theme.custom.colors.white,
        border: 'solid 1px #C6CCD3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        '& div': {
          '&:nth-child(2)': {
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          },
        },
        '& .select_icon': {
          width: '24px',
          height: '24px',
          background: `url(${Sort}) no-repeat center center`,
          backgroundSize: 'cover',
          marginRight: '12px',
        },
        '& .select_box': {
          '& fieldset': {
            border: 0,
          },
          '& div': {
            color: '#434D56',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
          },
        },
      },
    },
    user_code: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'baseline',
      '& .branchBox': {
        display: 'flex',
        maxWidth: '150px',
        flexWrap: 'wrap',
        gap: '5px',
        marginTop: '10px',
      },
    },
    department: {
      padding: '0 8px',
      backgroundColor: '#99FF66',
      borderRadius: 4,
    },
    staffCode: {
      color: '#6E7282',
    },
    username: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'left',
    },
    avatar: {
      width: '26px',
      height: '26px',
      borderRadius: '50%',
      backgroundColor: '#fdd145',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    name: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#434E74',
      lineheight: '14px',
    },
    actionGroup: {
      display: 'flex',
      gap: '10px',
    },
    sortBy: {
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
    btnFilter: {
      width: '12%',
      '& button': {
        width: '100%',
        padding: '15px 24px',
      },
    },
  };
});

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: 'desc',
};

const UserList = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { open: openAddUser, toggle: toggleAddUser, shouldRender: shouldRenderAddUser } = useToggleDialog();
  const { filters, handleChangePage, handleSelect, handleSelectAll, handleRequestSort, handleSearch } =
    useFilters(initialFilters);
  const { isLoading: isAddingUser, mutateAsync: addUser } = useAddUsers();
  const { isLoading: isEditingUser, mutateAsync: editUser } = useEditUser();
  const { isLoading: isDeletingUser, mutateAsync: deleteUser } = useDeleteUser();

  const { data: resUserList, isLoading, error, refetch } = useGetListUsers(filters);
  const data = resUserList?.data?.data.data || [];
  const paging = resUserList?.data?.data.paging || [];

  const columns = useMemo(() => {
    return [
      {
        label_custom: () => {
          return (
            <Box className={classes.user_code}>
              <Box>{t('common:userlist_staffCode')}</Box>
              <Box>{t('common:userlist_department')}</Box>
            </Box>
          );
        },
        id: 'staffCode',
        Cell: (row) => {
          return (
            <Box className={classes.user_code}>
              <Box className={classes.staffCode}>{row?.staffCode}</Box>
              <Tooltip
                title={<span style={{ whiteSpace: 'pre-line' }}>{getBranchesNames(row?.branchDetails)}</span>}
                followCursor
                arrow
              >
                <div className="branchBox">
                  {row?.branchDetails?.map((item, index) => {
                    if (index >= 2) return;
                    return (
                      <Box key={item?.id} className={classes.department}>
                        {toAcronym(item?.name)}
                      </Box>
                    );
                  })}
                </div>
              </Tooltip>
            </Box>
          );
        },
      },
      {
        label: `${t('common:userlist_fullName')}`,
        id: 'fullname',
        Cell: (row) => {
          return (
            <Box className={classes.username}>
              <Box
                className={classes.avatar}
                style={{
                  backgroundImage: `url(${
                    row.avatar ? BASE_IMAGE + row.avatar : 'https://i.stack.imgur.com/l60Hf.png'
                  })`,
                }}
              ></Box>
              <Box className={classes.name}>{row?.fullname}</Box>
            </Box>
          );
        },
      },
      {
        label: `${t('common:userlist_phone')}`,
        id: 'phoneNumber',
      },
      {
        label: 'Email',
        id: 'email',
      },
      {
        label: `${t('common:userlist_jobRole')}`,
        id: 'userRole',
        Cell: (row) => {
          return <Box>{row?.userRoleDetail?.name}</Box>;
        },
      },
      {
        label: `${t('common:userlist_jobTitle')}`,
        id: 'userTitleName',
      },
      {
        label: '',
        id: 'table_action',
        Cell: (row) => {
          return <CellActions user={row} refetch={refetch} />;
        },
      },
    ];
  }, [data]);

  //! Function

  //! Render
  return (
    <Formik
      initialValues={{
        searchValue: '',
        sort: 'desc',
      }}
      onSubmit={(values) => {
        handleSearch('searchText')(values.searchValue);
        handleRequestSort('sort')(values.sort);
      }}
    >
      {(props) => {
        return (
          <Form style={{ marginBottom: '50px' }}>
            <Box mb="23px" className={classes.userlist_header}>
              <CommonStyles.Button
                sx={{
                  flex: 1,
                  overflow: 'hidden',
                  ':hover': {
                    bgcolor: '#00CD00',
                    color: 'white',
                  },
                }}
                color="primary"
                startIcon={<CommonIcons.Add />}
                onClick={toggleAddUser}
              >
                {t('common:add_user')}
              </CommonStyles.Button>
              <div>
                <div>
                  {shouldRenderAddUser && (
                    <DialogAddUser
                      open={openAddUser}
                      toggle={toggleAddUser}
                      isLoading={isAddingUser || isEditingUser}
                      refetch={refetch}
                    />
                  )}
                </div>
              </div>
              <Box className="search_container">
                <Field
                  component={InputField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CommonIcons.Search />
                      </InputAdornment>
                    ),
                  }}
                  placeholder={t('common:userlist_search')}
                  sx={{ height: '100%' }}
                  className="search_box"
                  name="searchValue"
                />
              </Box>
              <Box className={classes.btnFilter}>
                <CommonStyles.Button type="submit">{t('common:search')}</CommonStyles.Button>
              </Box>
              <Box className="select_container">
                <Box>
                  <Box className="select_icon"></Box>
                </Box>
                <Box className={classes.sortBy}>{t('common:sort_by')}</Box>
                <Box>
                  <Field
                    component={SelectField}
                    options={[
                      { value: 'fullname:ASC', label: `${t('common:permission_name')}` },
                      { value: 'staffCode:ASC', label: 'Mã nhân viên' },
                      { value: 'userTitle:ASC', label: 'Chức vụ' },
                      { value: 'userRole:ASC', label: 'Chức danh' },
                    ]}
                    className="select_box"
                    name="sort"
                    value={props.values.sort}
                    afterOnChange={(e) => handleRequestSort('sort')(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
            <CommonStyles.Content>
              <CommonStyles.Table
                filters={filters}
                data={data}
                total={paging?.total}
                maxPage={paging?.totalPage}
                columns={columns}
                hasCheckbox={false}
                handleChangePage={handleChangePage}
                handleSelect={handleSelect}
                handleSelectAll={handleSelectAll}
                currentPage={filters.page}
              />
            </CommonStyles.Content>
            {/* <CommonStyles.Button type="submit" sx={{ display: 'none' }} /> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserList;
