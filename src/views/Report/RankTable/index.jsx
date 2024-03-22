import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { useGetRankTelesale } from 'hooks/report/useGetRankTelesale';
import httpServices from 'services/httpServices';
import useFilters from 'hooks/useFilters';
import { memo } from 'react';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {};
});

const RankTable = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const project = httpServices.getServiceStorage();
  const initialFilters = {
    page: 1,
    pageSize: 5,
    sort: 'desc',
    project: project,
  };

  const { filters, setFilters, handleChangePage, handleSelect, handleSelectAll } = useFilters(initialFilters);

  const { isLoading, data: resRankTelesale } = useGetRankTelesale(filters);
  const data = resRankTelesale?.data?.data || [];
  const dataConvert = data
    ?.filter((item, index) => index < 5)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
      rate: Number((item.rate * 100).toFixed(2)),
    }));

  const columns = [
    { label: 'Rank', id: 'rank' },
    { label: 'Nhân viên', id: 'username' },
    { label: 'Số lịch hẹn', id: 'contactAssignAppointment' },
    { label: 'Tỉ lệ khách đặt', id: 'rate', Cell: (row) => <Box>{row?.rate} %</Box> },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Content>
      <CommonStyles.Table columns={columns} data={dataConvert} filters={initialFilters} isLoading={isLoading} />
    </CommonStyles.Content>
  );
};

export default memo(RankTable);
