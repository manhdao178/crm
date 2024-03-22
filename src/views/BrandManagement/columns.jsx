import { Box } from '@mui/material';
import { React } from 'react';
import HeadLabel from './Head/HeadLabel';

export const columns = [
  {
    label: <HeadLabel label="project" />,
    id: 'project',
    component: 'th',
    Cell: (row) => {
      return <Box>{row?.projectDetail?.name}</Box>;
    },
  },
  {
    label: <HeadLabel label="brand_id" />,
    id: 'code',
  },
  {
    label: <HeadLabel label="brand_name" />,
    id: 'name',
  },
  {
    label: <HeadLabel label="brand_numberPhone" />,
    id: 'phoneNumber',
  },
  {
    label: <HeadLabel label="brand_email" />,
    id: 'email',
  },
  {
    label: <HeadLabel label="brand_address" />,
    id: 'address',
    Cell: (row) => {
      return <Box style={{ maxWidth: '300px' }}>{row.address}</Box>;
    },
  },
];
