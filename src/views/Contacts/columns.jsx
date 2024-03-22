import { React } from 'react';
import CellActions from './Cell/CellActions';
import CellComment from './Cell/CellComment';
import CellDate from './Cell/CellDate';
import CellItem from './Cell/CellItem';
import CellItemBig from './Cell/CellItemBig';
import CellItemNote from './Cell/CellItemNote';
import CellLink from './Cell/CellLink';
import CellReCallDate from './Cell/CellReCallDate';
import HeadLabel from './Head/HeadLabel';

export const columns = [
  {
    label: '',
    id: 'commment',
    Cell: (row) => <CellComment data={row.leaderNote} />,
  },
  {
    label: <HeadLabel label="contacts_fractionDate" title="interactiveDate" />,
    id: 'interactiveDate',
    Cell: (row) => <CellDate hasTime data={row?.telesale?.assignDate} />,
  },
  {
    label: <HeadLabel label="contacts_reCallDate" title="reCallDate" />,
    id: 'reCallDate',
    Cell: (row) => <CellReCallDate data={row?.callbackDate} />,
  },
  {
    label: <HeadLabel label="contacts_customerName" title="fullname" />,
    id: 'fullname',
    Cell: (row) => <CellItemBig data={row.fullname} />,
  },
  {
    label: <HeadLabel label="data_numberPhone" title="phoneNumber" />,
    id: 'phoneNumber',
    Cell: (row) => <CellItem data={row.phoneNumber} />,
  },
  {
    label: <HeadLabel label="contacts_link" />,
    id: 'link',
    Cell: (row) => <CellLink data={row.link} />,
  },
  {
    label: <HeadLabel label="contacts_service" title="service" />,
    id: 'service',
    Cell: (row) => <CellItem data={row?.serviceDetail?.name} />,
  },
  {
    label: <HeadLabel label="contacts_branch" title="branch" />,
    id: 'branch',
    Cell: (row) => <CellItem data={row?.branchDetail?.name} />,
  },
  {
    label: <HeadLabel label="contacts_pageName" title="fanpage" />,
    id: 'pageName',
    Cell: (row) => <CellItem data={row?.fanpageDetail?.creatorDetail?.fullname} />,
  },
  {
    label: <HeadLabel label="contacts_telesale" title="telesales" />,
    id: 'telesales',
    Cell: (row) => <CellItem data={row?.telesale?.assigneeDetail?.fullname} />,
  },
  {
    label: <HeadLabel label="contacts_note" />,
    id: 'note',
    Cell: (row) => <CellItemNote data={row.note ? row.note : row.fanpageDetail?.note} emptyTitle="Không có" />,
  },
  {
    Cell: (row) => {
      return <CellActions item={row} />;
    },
  },
];
