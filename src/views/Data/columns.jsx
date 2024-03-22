import { React } from 'react';
import CellDate from './Cell/CellDate';
import CellName from './Cell/CellName';
import CellItem from './Cell/CellItem';
import CellWrongNumber from './Cell/CellWrongNumber';
import HeadLabel from './Head/HeadLabel';
import CellLink from './Cell/CellLink';

export const columns = [
  {
    label: <HeadLabel label="data_interactiveDate" />,
    id: 'interactiveDate',
    Cell: (row) => <CellDate sx={{ minWidth: '150px' }} data={row.interactiveDate} />,
  },
  {
    label: <HeadLabel label="data_name" />,
    id: 'fullname',
    Cell: (row) => <CellName sx={{ minWidth: '150px' }} row={row} />,
  },
  {
    label: <HeadLabel label="data_numberPhone" />,
    id: 'phoneNumber',
    Cell: (row) => <CellItem data={row.phoneNumber} />,
  },
  {
    label: <HeadLabel label="data_link" />,
    id: 'link',
    Cell: (row) => <CellLink data={row.link} />,
  },
  {
    label: <HeadLabel label="data_service" />,
    id: 'service',
    Cell: (row) => <CellItem data={row?.serviceDetail?.name} />,
  },
  {
    label: <HeadLabel label="data_branch" />,
    id: 'branch',
    Cell: (row) => <CellItem data={row?.branchDetail?.name} />,
  },
  {
    label: <HeadLabel label="data_note" />,
    id: 'note',
    Cell: (row) => <CellItem data={row.note} emptyTitle="Không có" />,
  },
  {
    label: <HeadLabel label="data_wrongNumber" />,
    id: 'isBadPhoneNumber',
    Cell: (row) => <CellWrongNumber data={row.isBadPhoneNumber} />,
  },
  {
    label: <HeadLabel label="data_managerPage" />,
    id: 'managerPage',
    Cell: (row) => <CellItem data={row.fanpageUserDetail.fullname} />,
  },
  {
    label: <HeadLabel label="data_fractionDate" />,
    id: 'fractionDate',
    Cell: (row) => <CellDate hasTime data={row?.telesale?.assignDate} />,
  },
  {
    label: <HeadLabel label="data_ids" />,
    id: 'id',
    Cell: (row) => <CellItem data={row.fanpageIDs} />,
  },
];
