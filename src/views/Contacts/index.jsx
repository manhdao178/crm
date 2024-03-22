import React, { createContext, useEffect, useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import { Fragment } from 'react';
import useFilters from 'hooks/useFilters';
import FormSearch from './formSearch';
import Tabs from './Tabs';
import { useGetDataLeads } from 'hooks/leads/useGetDataLeads';
import { useGetStatusOptions } from 'hooks/status/useGetStatusOptions';
import { showError } from 'helpers/toast';
import { useCallback } from 'react';
import moment from 'moment';
import CallProvider from 'providers/CallProvider';
import TableAppointment from './Components/TableAppointment';
import TabsHeader from '../Report/Tabs';
import httpServices from 'services/httpServices';
import { roles } from 'constants/index';
import { useGetDataLeadsManage } from 'hooks/leads/useGetDataLeadsManage';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import { makeStyles } from '@mui/styles';
import { columns } from './columns';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => {
  return {
    loading: {
      width: '70px !important',
      height: '70px !important',
    },
    loadingContainer: {
      marginTop: 50,
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
  };
});

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: '',
  status: '',
  isFinish: false,
  isInTakeCare: false,
};

const ContactsPage = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const [showAppointment, setShowAppointment] = useState(false);
  const [finish, setFinish] = useState(false);
  const { tabPageLead, setTabPageLead, filterTableContact } = useContactPageLead();
  const { filters, setFilters, handleChangePage, handleSelect, handleSelectAll, handleSearch } =
    useFilters(initialFilters);
  const {
    data: dataLeads,
    isLoading,
    error,
    refetch,
  } = tabPageLead === 'personal'
    ? useGetDataLeads(filters, { enabled: filters['project'] !== undefined })
    : useGetDataLeadsManage(filters, { enabled: filters['project'] !== undefined });
  const data = dataLeads?.data?.data.data || [];
  const paging = dataLeads?.data?.data.paging;

  const dataConvert = data.map((item) => ({
    ...item,
    isBorder: item?.isHotNumber && !item?.lastInteractiveDate,
  }));

  const columnsChecked = tabPageLead !== 'personal' ? columns : columns.filter((item) => item.id !== 'telesales');

  const listStatusDefault = [
    {
      label: t('common:personContact'),
      value: 'personal',
    },
    {
      label: t('common:teamContact'),
      value: 'team',
    },
  ];
  const user = httpServices.getUserInfoStorage();
  const roleUser = user?.userRoleDetail?.key || '';
  const listItem = listStatusDefault.map((item) => {
    return {
      isActive: tabPageLead === item?.value,
      label: item?.label,
      onClick: () => setTabPageLead(item.value),
    };
  });

  //! Function
  const CheckTabHeader = () => {
    if (roleUser === roles.TELESALE_LEAD || roleUser === roles.PAGE_LEAD) {
      return <TabsHeader listItem={listItem} />;
    }
    return <></>;
  };

  const onClickStatus = useCallback(
    (name, value) => () => {
      handleSearch('searchText')('');
      if (value === 'Booked' || value === 'FINISHED') {
        setShowAppointment(true);
      } else {
        setShowAppointment(false);
      }

      if (value === 'FINISHED') {
        setFinish(true);
        setFilters((prev) => ({ ...prev, search: { ...filters.search, status: 'FINISHED' } }));
      } else if (value === 'Booked') {
        setFinish(false);
      }
      setFilters((prev) => {
        // if (name === 'FINISHED') {
        //   return {
        //     ...prev,
        //     status: '',
        //     isFinish: true,
        //     isInTakeCare: false,
        //   };
        // }
        if (name === 'isInTakeCare') {
          return {
            ...prev,
            status: '',
            isFinish: false,
            isInTakeCare: true,
          };
        }
        return {
          ...prev,
          [name]: value,
          isFinish: false,
          isInTakeCare: false,
        };
      });
    },
    [],
  );

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        project: httpServices.getServiceStorage(),
      };
    });
  }, []);
  useEffect(() => {
    const filterConvert = {
      startAssignDate: filterTableContact.startAssignDate ? filterTableContact.startAssignDate.toISOString() : '',
      endAssignDate: filterTableContact.endAssignDate ? filterTableContact.endAssignDate.toISOString() : '',
      callbackDate: filterTableContact.reCallDate ? filterTableContact.reCallDate.toISOString() : '',
      branches: filterTableContact.branch ? filterTableContact.branch.map((item) => item.value) : '',
      services: filterTableContact.service ? filterTableContact.service.map((item) => item.value) : '',
      fullname: filterTableContact.fullname,
      phoneNumber: filterTableContact.phoneNumber,
      telesales: isEmpty(filterTableContact.telesales) ? '' : filterTableContact.telesales.map((item) => item.value),
      fanpages: isEmpty(filterTableContact.fanpage) ? '' : filterTableContact.fanpage.map((item) => item.value),
    };

    setFilters((prev) => ({ ...prev, search: filterConvert }));
  }, [filterTableContact]);

  //! Render
  return (
    <Fragment>
      {CheckTabHeader()}
      <FormSearch refetch={refetch} handleSearch={handleSearch} status={filters?.status} />
      <CommonStyles.Content>
        <Tabs onClickStatus={onClickStatus} filters={filters} paging={paging} />
        {showAppointment ? (
          <TableAppointment searchText={filters?.searchText} checkFinish={finish} />
        ) : (
          <CommonStyles.Table
            filters={filters}
            data={dataConvert}
            isLoading={isLoading}
            total={paging?.total}
            maxPage={paging?.totalPage}
            columns={columnsChecked}
            handleChangePage={handleChangePage}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
            sxCell={{ padding: '15px 10px !important' }}
            currentPage={filters.page}
          />
        )}
      </CommonStyles.Content>
    </Fragment>
  );
};

export default ContactsPage;
