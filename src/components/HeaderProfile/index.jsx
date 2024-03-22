import React from 'react';
import { makeStyles } from '@mui/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      width: '100%',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 18,
      color: '#919499',
      '& .company-name': {},
      '& .header-time': {},
    },
  };
});

const HeaderProfile = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className="company-name">CRM</div>
      <div className="header-time">{moment().locale('en').format('MMMM Do YYYY')}</div>
    </div>
  );
};

export default HeaderProfile;
