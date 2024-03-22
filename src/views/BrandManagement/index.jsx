import React from 'react';
import PropTypes from 'prop-types';
import CommonStyles from 'components/CommonStyles';
import { Fragment } from 'react';
import { columns } from './columns';
import useFilters from 'hooks/useFilters';
import FormSearch from './formSearch';
import BrandGroup from './Component/BrandGroup';
import PermissionGroup from 'views/Permission/Components/PemissionGroup';
import { useGetBranchs } from 'hooks/branch/useGetBranchs';
import { useDeleteBranch } from 'hooks/branch/useDeleteBranch';
import { showError, showInfo } from 'helpers/toast';

const propTypes = {};

const initialFilters = {
  page: 1,
  searchValue: '',
  pageSize: 10,
  sort: 'desc',
};

const BrandManagement = (props) => {
  //! State
  // const data = [
  //   {
  //     id: 1,
  //     project: 'Medic skin',
  //     name: 'Medic skin Gò vấp',
  //     numberPhone: '0123456789',
  //     email: 'abc@gmail.com',
  //     address: '1 Ngõ 78 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
  //   },
  //   {
  //     id: 2,
  //     project: 'Medic skin',
  //     name: 'Medic skin Gò vấp',
  //     numberPhone: '0123456789',
  //     email: 'abc@gmail.com',
  //     address: '1 Ngõ 78 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
  //   },
  //   {
  //     id: 3,
  //     project: 'Medic skin',
  //     name: 'Medic skin Gò vấp',
  //     numberPhone: '0123456789',
  //     email: 'abc@gmail.com',
  //     address: '1 Ngõ 78 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
  //   },
  // ];

  // const { filters, setFilters, rowsSelected, handleChangePage, handleSelect, handleSelectAll, handleRequestSort } =
  //   useFilters(initialFilters)
  const {
    filters,
    setFilters,
    rowsSelected,
    setRowsSelected,
    handleChangePage,
    handleSelect,
    handleSelectAll,
    handleSelectOne,
    handleRequestSort,
    handleSearch,
  } = useFilters(initialFilters);

  const { data: resBranchList, isLoading, error, refetch } = useGetBranchs(filters);
  const data = resBranchList?.data?.data.data || [];
  const paging = resBranchList?.data?.data.paging || [];
  //! Function

  //! Render
  return (
    <Fragment>
      <FormSearch handleSearch={handleSearch} />
      <CommonStyles.Content>
        <CommonStyles.Table
          filters={filters}
          data={data}
          total={paging?.total}
          maxPage={paging?.totalPage}
          columns={columns}
          hasCheckbox={true}
          noCheckboxHead={true}
          handleChangePage={handleChangePage}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleSelectOne={handleSelectOne}
          rowsSelected={rowsSelected}
        />
        <BrandGroup rowsSelected={rowsSelected} handleSelectAll={handleSelectAll} refetch={refetch} />
      </CommonStyles.Content>
    </Fragment>
  );
};

BrandManagement.propTypes = propTypes;
export default BrandManagement;
