import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { checkInteger } from 'helpers';

const useStyles = makeStyles((theme) => {
  return {
    dashboard_item: {
      padding: '18px 16px',
      borderRadius: '12px',
      backgroundColor: theme.custom.colors.white,
      boxShadow: '0px 20px 27px 0px #05295F0D',
      minWidth: '245px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textGroup_value: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: '10px',
      '& .positive': {
        color: '#09706A',
        fontWeight: 'bold',
      },
      '& .negative': {
        color: '#F81D1D',
      },
      '& .value': {
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '27.24px',
        fontFamily: "'Open Sans', sans-serif",
      },
      '& .change': {
        fontSize: '14px',
        fontWeight: '700',
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: '19.07px',
      },
    },
    textGroup_title: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      color: '#67748E',
    },
    icon_box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '44px',
      height: '44px',
      backgroundColor: '#99FF66',
      borderRadius: '12px',
    },
    icon: {
      width: '18px',
      height: '20px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  };
});

const SummaryItem = ({ data }) => {
  //! Define
  const classes = useStyles();
  const { t } = useTranslation();
  const { title, value, icon } = data;

  //! Functions

  //! Render
  return (
    <div className={classes.dashboard_item}>
      <div className={classes.textGroup}>
        <div className={classes.textGroup_title}>{title}</div>
        <div className={classes.textGroup_value}>
          <div className="value">{checkInteger(value)}</div>
        </div>
      </div>
      <div className={classes.icon_box}>
        <div className={classes.icon} style={{ backgroundImage: `url(${icon})` }} />
      </div>
    </div>
  );
};

export default SummaryItem;
