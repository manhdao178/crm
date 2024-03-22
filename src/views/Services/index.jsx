import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import useFilters from 'hooks/useFilters';
import { columns } from './columns';
import CreateAndUpdateService from './Component/CreateAndUpdateService';
import FormSearch from './formSearch';
import { useGetListServices } from 'hooks/service/useGetListServices';
import { useAddService } from 'hooks/service/useAddService';
import { showError, showSuccess } from 'helpers/toast';
import { isArray } from 'lodash';

const useStyles = makeStyles((theme) => {
  return {};
});

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: 'desc',
};

const Services = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const { filters, rowsSelected, handleChangePage, handleSelect, handleSelectAll, handleSelectOne, handleSearch } =
    useFilters(initialFilters);

  const { isLoading: isAddingService, mutateAsync: addService } = useAddService();

  const { data: resServiceList, isLoading, error, refetch } = useGetListServices(filters);
  const dataConvert = resServiceList?.data?.data?.data;
  const paging = resServiceList?.data?.data.paging;
  const data = dataConvert?.map((item) => ({
    ...item,
    branchName: item?.branchDetail?.name,
  }));

  //! Function

  const handleAddService = async (values, { resetForm }) => {
    const branchs = values.branches?.[0]?.value || [];
    const branchsConvert = isArray(branchs) ? branchs : values.branches.map((item) => item.value);
    const valueConvert = { ...values, branches: branchsConvert };
    try {
      const res = await addService(valueConvert);
      await refetch();
      showSuccess(t('common:service_addSuccess'));
      resetForm();
    } catch (error) {
      showError(t('common:service_addError'));
    }
  };

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
          hasCheckbox={true}
          noCheckboxHead={true}
          handleChangePage={handleChangePage}
          handleSelect={handleSelect}
          handleSelectOne={handleSelectOne}
          handleSelectAll={handleSelectAll}
        />
        <CreateAndUpdateService
          handleSelectAll={handleSelectAll}
          handleAddService={handleAddService}
          rowsSelected={rowsSelected}
          refetch={refetch}
        />
      </CommonStyles.Content>
    </Fragment>
  );
};

export default Services;
