import { Box } from '@mui/system';
import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import SimpleBarReact from 'simplebar-react';
import BigCalendar from './BigCalendar';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      fontSize: '20px',
      fontWeight: 500,
      color: '#708090',
    },
    wrapper: {
      border: '1px solid #ccc',
      padding: '10px',
    },
  };
});

const CalendarReport = ({ data }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box className={classes.wrapper}>
        <div className={classes.header}>Lịch hẹn</div>
        <Box>
          <BigCalendar data={data} />
        </Box>
      </Box>
    </Fragment>
  );
};

export default CalendarReport;
