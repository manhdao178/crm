import React, { useEffect } from 'react';
import CommonStyles from 'components/CommonStyles';
import { Fragment } from 'react';
import useFilters from 'hooks/useFilters';
import FormSearch from './formSearch';
import { useGetDataLeads } from 'hooks/leads/useGetDataLeads';
import { useGetDataFanpage } from 'hooks/leads/useGetDataFanpage';
import CellDate from './Cell/CellDate';
import CellName from './Cell/CellName';
import CellItem from './Cell/CellItem';
import CellWrongNumber from './Cell/CellWrongNumber';
import HeadLabel from './Head/HeadLabel';
import CellLink from './Cell/CellLink';
import CellActions from './Cell/CellActions';
import httpServices from 'services/httpServices';
import TabsHeader from '../Report/Tabs';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import { roles } from 'constants/index';
import { useGetDataFanpageManage } from 'hooks/leads/useGetDataFanpageManage';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const DataPage = (props) => {
  //! State
  const { filterTableDataPage } = useContactPageLead();
  const project = httpServices.getServiceStorage();
  const { t } = useTranslation();
  const initialFilters = {
    page: 1,
    pageSize: 10,
    sort: 'desc',
    status: 'personal',
    project: project,
  };

  const { filters, setFilters, rowsSelected, handleChangePage, handleSelect, handleSelectAll, handleSearch } =
    useFilters(initialFilters);

  const {
    data: dataLeads,
    loading,
    error,
    refetch,
  } = filters?.status === 'personal'
    ? useGetDataFanpage(filters, { enabled: filters['project'] !== undefined })
    : useGetDataFanpageManage(filters, { enabled: filters['project'] !== undefined });
  const data = dataLeads?.data?.data?.data || [];
  const paging = dataLeads?.data?.data?.paging;

  const dataConvert = data.map((item) => ({
    ...item,
    id: item?._id,
    isBorder: item?.isHotNumber && !item?.lastInteractiveDate,
  }));

  const listStatusDefault = [
    {
      label: `${t('common:teamData')}`,
      value: 'personal',
    },
    {
      label: `${t('common:teamData')}`,
      value: 'team',
    },
  ];
  const user = httpServices.getUserInfoStorage();
  const roleUser = user?.userRoleDetail?.key || '';

  const initColumns = [
    {
      id: 'action',
      Cell: (row) => {
        return <CellActions item={row} isLoading={loading} refetch={refetch} />;
      },
    },

    {
      label: <HeadLabel label="data_interactiveDate" title="interactiveDate" />,
      id: 'interactiveDate',
      Cell: (row) => <CellDate data={row.interactiveDate} />,
    },
    {
      label: <HeadLabel label="data_name" title="fullname" />,
      id: 'fullname',
      Cell: (row) => <CellName row={row} />,
    },
    {
      label: <HeadLabel label="data_numberPhone" title="phoneNumber" />,
      id: 'phoneNumber',
      Cell: (row) => <CellItem data={row.phoneNumber} />,
    },
    {
      label: <HeadLabel label="data_link" />,
      id: 'link',
      Cell: (row) => <CellLink data={row.link} />,
    },
    {
      label: <HeadLabel label="data_service" title="service" />,
      id: 'service',
      Cell: (row) => <CellItem data={row?.serviceDetail?.name} />,
    },
    {
      label: <HeadLabel label="data_branch" title="branch" />,
      id: 'branch',
      Cell: (row) => <CellItem data={row?.branchDetail?.name} />,
    },
    {
      label: <HeadLabel label="data_note" />,
      id: 'note',
      Cell: (row) => <CellItem data={row.note} emptyTitle="Không có" />,
    },
    {
      label: <HeadLabel label="first_telesale" title="firstTelesales" />,
      id: 'telesaleName',
      Cell: (row) => <CellItem data={row.firstTelesale?.assigneeDetail?.fullname} />,
    },
    {
      label: <HeadLabel label="last_telesale" title="telesales" />,
      id: 'telesaleName',
      Cell: (row) => <CellItem data={row.telesale?.assigneeDetail?.fullname} />,
    },
    {
      label: <HeadLabel label="data_wrongNumber" title="isBadPhoneNumber" />,
      id: 'isBadPhoneNumber',
      Cell: (row) => <CellWrongNumber row={row} isEdit={filters?.status === 'personal'} />,
    },
    {
      label: <HeadLabel label="data_managerPage" title="fanpage" />,
      id: 'managerPage',
      Cell: (row) => <CellItem data={row.fanpageUserDetail.fullname} />,
    },
    {
      label: <HeadLabel label="first_assignDate" title="firstAssignDate" />,
      id: 'fractionDate',
      Cell: (row) => <CellDate data={row?.firstTelesale?.assignDate} />,
    },
    {
      label: <HeadLabel label="last_assignDate" title="assignDate" />,
      id: 'lastAssignDate',
      Cell: (row) => <CellDate data={row?.telesale?.assignDate} />,
    },
    {
      label: <HeadLabel label="data_ids" title="fanpageIDs" />,
      id: 'id',
      Cell: (row) => <CellItem data={row.fanpageIDs} />,
    },
  ];

  const columnsPersonal = initColumns.filter((item) => item.id !== 'managerPage');
  const columnsTeam = initColumns.filter((item) => item.id !== 'action');

  //! Function

  const onClickStatus = (name, value) => () => {
    setFilters((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const listItem = listStatusDefault.map((item) => {
    return {
      isActive: filters.status === item?.value,
      label: item?.label,
      onClick: onClickStatus('status', item?.value),
    };
  });

  const CheckTabHeader = () => {
    if (roleUser === roles.TELESALE_LEAD || roleUser === roles.PAGE_LEAD) {
      return <TabsHeader listItem={listItem} />;
    }
    return <></>;
  };

  useEffect(() => {
    const filterConvert = {
      // interactiveDate: filterTableDataPage.interactiveDate ? filterTableDataPage.interactiveDate.toISOString() : '',
      startInteractiveDate: filterTableDataPage.startInteractiveDate
        ? filterTableDataPage.startInteractiveDate.toISOString()
        : '',
      endInteractiveDate: filterTableDataPage.endInteractiveDate
        ? filterTableDataPage.endInteractiveDate.toISOString()
        : '',
      startFirstAssignDate: filterTableDataPage.startFirstAssignDate
        ? filterTableDataPage.startFirstAssignDate.toISOString()
        : '',
      endFirstAssignDate: filterTableDataPage.endFirstAssignDate
        ? filterTableDataPage.endFirstAssignDate.toISOString()
        : '',
      startAssignDate: filterTableDataPage.startAssignDate ? filterTableDataPage.startAssignDate.toISOString() : '',
      endAssignDate: filterTableDataPage.endAssignDate ? filterTableDataPage.endAssignDate.toISOString() : '',

      branches: filterTableDataPage.branch ? filterTableDataPage.branch.map((item) => item.value) : '',
      services: filterTableDataPage.service ? filterTableDataPage.service.map((item) => item.value) : '',
      fullname: filterTableDataPage.fullname,
      phoneNumber: filterTableDataPage.phoneNumber,
      telesales: isEmpty(filterTableDataPage.telesales) ? '' : filterTableDataPage.telesales.map((item) => item.value),
      firstTelesales: isEmpty(filterTableDataPage.firstTelesales)
        ? ''
        : filterTableDataPage.firstTelesales.map((item) => item.value),
      isBadPhoneNumber: filterTableDataPage.isBadPhoneNumber ? true : null,
      fanpageIDs: filterTableDataPage.fanpageIDs,
      fanpages: isEmpty(filterTableDataPage.fanpage) ? '' : filterTableDataPage.fanpage.map((item) => item.value),
      // assignDate: filterTableDataPage.assignDate ? filterTableDataPage.assignDate.toISOString() : '',
    };

    setFilters((prev) => ({ ...prev, search: filterConvert }));
  }, [filterTableDataPage]);

  //! Render
  return (
    <Fragment>
      {CheckTabHeader()}
      <FormSearch handleSearch={handleSearch} refetch={refetch} status={filters?.status} />
      <CommonStyles.Content>
        <CommonStyles.Table
          filters={filters}
          data={dataConvert}
          total={paging?.total}
          maxPage={paging?.totalPage}
          columns={filters.status === 'personal' ? columnsPersonal : columnsTeam}
          handleChangePage={handleChangePage}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
        />
      </CommonStyles.Content>
    </Fragment>
  );
};

export default DataPage;
