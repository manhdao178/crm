import { React } from 'react';
import CellItem from './Cell/CellItem';
import HeadLabel from './Cell/HeadLabel';

export const columns = [
  {
    label: <HeadLabel label="admin_ads_orderNumber" />,
    id: 'orderNumber',
    Cell: (row) => <CellItem data={row?.orderNumber} />,
  },
  {
    label: <HeadLabel label="admin_ads_project" />,
    id: 'project',
    Cell: (row) => <CellItem data={row?.project} />,
  },
  {
    label: <HeadLabel label="admin_ads_branch" />,
    id: 'branch',
    Cell: (row) => <CellItem data={row?.branch} />,
  },
  {
    label: <HeadLabel label="admin_ads_KPI" />,
    id: 'KPI',
    Cell: (row) => <CellItem data={row?.KPI} />,
  },
  {
    label: <HeadLabel label="admin_ads_ADSCost" />,
    id: 'ADSCost',
    Cell: (row) => <CellItem data={row?.ADSCost} />,
  },
  {
    label: <HeadLabel label="admin_ads_schedule" />,
    id: 'schedule',
    Cell: (row) => <CellItem data={row?.schedule} />,
  },
  {
    label: <HeadLabel label="admin_ads_success" />,
    id: 'success',
    Cell: (row) => <CellItem data={row?.success} />,
  },
  {
    label: <HeadLabel label="admin_ads_cancel" />,
    id: 'cancel',
    Cell: (row) => <CellItem data={row?.cancel} />,
  },
  {
    label: <HeadLabel label="admin_ads_revenue" />,
    id: 'revenue',
    Cell: (row) => <CellItem data={row?.revenue} />,
  },
  {
    label: <HeadLabel label="admin_ads_turnover" />,
    id: 'turnover',
    Cell: (row) => <CellItem data={row?.turnover} />,
  },
  {
    label: <HeadLabel label="admin_ads_comment" />,
    id: 'appreciate',
    Cell: (row) => <CellItem data={row?.appreciate} />,
  },
];
