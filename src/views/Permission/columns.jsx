import { React } from 'react';
import CellCode from './Cells/CellCode';
import CellItem from './Cells/CellItem';
import CellName from './Cells/CellName';
import CellRank from './Cells/CellRank';
import HeadLabel from './Head/HeadLabel';
import { Box } from '@mui/system';
import CellItemNote from './Cells/CellItemNote';

const customHead = (staffCode, department) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
      <Box>{staffCode}</Box>
      <Box>{department}</Box>
    </Box>
  );
};

export const columns = [
  {
    label: <HeadLabel label="permission_code" customHead={customHead} />,
    id: 'staffCode',
    Cell: (row) => <CellCode row={row} />,
  },
  {
    label: <HeadLabel label="permission_name" />,
    id: 'name',
    Cell: (row) => <CellName row={row} />,
    component: 'th',
  },
  {
    label: <HeadLabel label="permission_numberPhone" />,
    id: 'phoneNumber',
    Cell: (row) => <CellItem data={row.phoneNumber} />,
  },
  {
    label: <HeadLabel label="permission_email" />,
    id: 'email',
    Cell: (row) => <CellItem data={row.email} />,
  },
  {
    label: <HeadLabel label="permission_position" />,
    id: 'userTitleName',
  },
  {
    label: <HeadLabel label="permission_rank" />,
    id: 'rank',
    Cell: (row) => <CellRank data={row} />,
  },
];
