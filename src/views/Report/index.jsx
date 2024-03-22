import { makeStyles } from '@mui/styles';
import CommonStyles from 'components/CommonStyles';
import { roles } from 'constants';
import { Form, Formik } from 'formik';
import useFilters from 'hooks/useFilters';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import httpServices from 'services/httpServices';
import * as Yup from 'yup';
import BranchPageTable from './BranchPageTable';
import FilterTab from './FilterTab';
import QualityTable from './QualityTable';
import RankTable from './RankTable';
import SummaryIndex from './SummaryIndex';
import Tabs from './Tabs';
import { useTranslation } from 'react-i18next';

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: 'desc',
  status: 'personal',
};

const useStyles = makeStyles((theme) => {
  return {};
});
const date = new Date();
date.setDate(date.getDate() + 1);

const validationSchema = Yup.object({
  from: Yup.date().test('same', 'Ngày bắt đầu phải trước ngày kết thúc', function (value) {
    if (moment(value).isSameOrAfter(moment(this.parent.to))) {
      return false;
    }
    return true;
  }),
  to: Yup.date().test('same', 'Ngày kết thúc phải sau ngày bắt đầu', function (value) {
    if (moment(value).isSameOrBefore(moment(this.parent.from))) {
      return false;
    }
    return true;
  }),
  // .max(date, 'Ngày kết thúc phải trước hoặc là ngày hôm nay'),
});

const ReportPage = (props) => {
  //! State
  const { filters, setFilters, handleChangePage, handleSelect, handleSelectAll } = useFilters(initialFilters);
  const user = httpServices.getUserInfoStorage();
  const roleUser = user?.userRoleDetail?.key || '';
  const classes = useStyles();
  const { t } = useTranslation();
  const firstDayOfMonth = moment().startOf('month').toISOString();
  const now = moment();
  const userRole = user?.userRoleDetail?.key;
  const userName = user?.fullname;
  const displayName = () => {
    if (userRole === roles.TELESALE_LEAD || userRole === roles.PAGE_LEAD) {
      return '';
    }
    return userName;
  };

  const listStatusDefault = [
    {
      label: t('common:personReport'),
      value: 'personal',
    },
    {
      label: t('common:teamReport'),
      value: 'team',
    },
  ];

  const initValueFormFilterTable = {
    from: firstDayOfMonth,
    to: now,
    branch: 'all',
  };

  //! Functions

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        project: httpServices.getServiceStorage(),
      };
    });
  }, []);

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
      return <Tabs listItem={listItem} />;
    }
    return <></>;
  };

  const CheckQualityTable = (filterValues) => {
    if (roleUser === roles.TELESALE_LEAD || roleUser === roles.TELESALE) {
      return <QualityTable filterValues={filterValues} status={filters.status} />;
    }
  };
  const CheckRankTable = () => {
    if ((roleUser === roles.TELESALE_LEAD || roleUser === roles.TELESALE) && filters.status === 'team') {
      return <RankTable />;
    }
  };
  const CheckBranchPageTable = (filterValues) => {
    console.log('filterValues: ', filterValues);
    if (roleUser === roles.PAGE_LEAD || roleUser === roles.FANPAGE) {
      return <BranchPageTable filterValues={filterValues} status={filters.status} />;
    }
  };

  //! Render
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        initialTouched={{
          from: true,
          to: true,
        }}
        initialValues={{
          from: firstDayOfMonth,
          to: now,
          branch: '',
          service: '',
          employee: displayName(),
        }}
        onSubmit={(values) => {}}
      >
        {({ values }) => {
          return (
            <Form>
              <CommonStyles.Content>
                {CheckTabHeader()}
                <FilterTab filters={filters} roleUser={roleUser} />
                <SummaryIndex values={values} filters={filters} roleUser={roleUser} />
              </CommonStyles.Content>

              {CheckQualityTable(values)}
              {CheckBranchPageTable(values)}
            </Form>
          );
        }}
      </Formik>

      {CheckRankTable()}
    </>
  );
};

export default ReportPage;
