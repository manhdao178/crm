import React from 'react';
import PropTypes from 'prop-types';
import CommonStyles from 'components/CommonStyles';
import { Fragment } from 'react';
import { columns } from './columns';
import useFilters from 'hooks/useFilters';
import FormSearch from './formSearch';
import PermissionGroup from './Components/PemissionGroup';
import { useGetListPermission } from 'hooks/permission/useGetListPermission';

const propTypes = {};

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: 'desc',
};

const Permission = (props) => {
  //! State
  const datas = [
    {
      id: 1,
      code: 'NV012345',
      codeBranch: 'Hn',
      name: 'Nguyễn Minh Thư',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU',
      numberPhone: '0123456789',
      email: 'abc@gmail.com',
      position: 'Tư vấn viên',
      rank: 'admin',
    },
    {
      id: 2,
      code: 'NV012345',
      codeBranch: 'Hn',
      name: 'Nguyễn Minh Thư',
      avatar: '',
      numberPhone: '0123456789',
      email: 'abc@gmail.com',
      position: 'Tư vấn viên',
      rank: 'admin',
    },
    {
      id: 3,
      code: 'NV012345',
      codeBranch: 'Hn',
      name: 'Nguyễn Minh Thư',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU',
      numberPhone: '0123456789',
      email: 'abc@gmail.com',
      position: 'Tư vấn viên',
      rank: 'admin',
    },
  ];

  const {
    filters,
    setFilters,
    rowsSelected,
    setRowsSelected,
    handleChangePage,
    handleSelect,
    handleSelectAll,
    handleSearch,
  } = useFilters(initialFilters);

  const { data: permissionList, loading, error, refetch } = useGetListPermission(filters);
  const data = permissionList?.data?.data.data;
  const paging = permissionList?.data?.data.paging;

  //! Function

  //! Render
  return (
    <Fragment>
      <FormSearch rowsSelected={rowsSelected} handleSearch={handleSearch} />
      <CommonStyles.Content>
        <CommonStyles.Table
          filters={filters}
          data={data}
          total={paging?.total}
          maxPage={paging?.totalPage}
          columns={columns}
          hasCheckbox={true}
          handleChangePage={handleChangePage}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
        />
        <PermissionGroup
          rowsSelected={rowsSelected}
          setRowsSelected={setRowsSelected}
          handleSelectAll={handleSelectAll}
          filters={filters}
          refetch={refetch}
        />
      </CommonStyles.Content>
    </Fragment>
  );
};

Permission.propTypes = propTypes;
export default Permission;
