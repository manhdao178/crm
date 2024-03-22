import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    cellName: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: '#434e74',
      fontWeight: 'bold',
      // paddingLeft: 12,
    },
  };
});

const CellName = ({ row, sx }) => {
  //! State
  const classes = useStyles();

  //! Function

  //! Render
  return (
    <div style={sx} className={classes.cellName}>
      <span className={classes.title}>{row?.fullname}</span>
    </div>
  );
};

export default CellName;
