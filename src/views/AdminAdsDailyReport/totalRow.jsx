import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { TableCell, TableRow } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    total_cell: {
      textAlign: 'center',
      fontWeight: '600 !important',
    },
    total_cell_title: {
      paddingLeft: '55px !important',
      fontWeight: '600 !important',
    },
  };
});

const TotalRow = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <TableRow>
      <TableCell className={classes.total_cell_title} colSpan={3}>
        Tổng số
      </TableCell>
      <TableCell className={classes.total_cell} style={{ textAlign: 'center' }}>
        50.000.000đ
      </TableCell>
      <TableCell className={classes.total_cell} style={{ textAlign: 'center' }}>
        50.000.000đ
      </TableCell>
      <TableCell className={classes.total_cell} style={{ textAlign: 'center' }}>
        400
      </TableCell>
      <TableCell className={classes.total_cell} style={{ textAlign: 'center' }}>
        320
      </TableCell>
      <TableCell className={classes.total_cell} style={{ textAlign: 'center' }}>
        80
      </TableCell>
      <TableCell className={classes.total_cell} style={{ textAlign: 'center' }}>
        500.000.000đ
      </TableCell>
      <TableCell className={classes.total_cell} style={{ textAlign: 'center' }}>
        210%
      </TableCell>
      <TableCell className={classes.total_cell} style={{ textAlign: 'center' }}>
        Đạt
      </TableCell>
    </TableRow>
  );
};

export default TotalRow;
