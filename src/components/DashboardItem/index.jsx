import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { fontFamily } from '@mui/system';

const useStyles = makeStyles((theme) => {
  return {
    dashboard_item: {
      padding: '18px 16px 60px 16px',
      borderRadius: '22px',
      backgroundColor: theme.custom.colors.white,
      boxShadow: '0px 20px 27px 0px #05295F0D',
      minWidth: '333px',
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
        fontSize: '22px',
        fontWeight: 700,
        lineHeight: '27.24px',
        fontFamily: "'Open Sans', sans-serif",
      },
      '& .change': {
        fontSize: '16px',
        fontWeight: '700',
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: '19.07px',
      },
    },
    textGroup_title: {
      fontSize: '18px',
      lineHeight: '20px',
      fontWeight: 500,
      color: '#008638',
      marginBottom: '8px',
    },
    icon_box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '48px',
      height: '48px',
      backgroundColor: '#99FF66',
      borderRadius: '24px',
    },
    icon: {
      width: '22px',
      height: '24px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  };
});

const DashboardItem = ({ data }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { title, value, change, icon } = data;
  const isNegative = +change < 0;
  //! Function
  const numberWithCommas = (x = 0) => {
    x % 1 === 0 ? (x = x) : (x = x.toFixed(2));
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join(',');
  };

  //! Render
  return (
    <div className={classes.dashboard_item}>
      <div className={classes.textGroup}>
        <div className={classes.textGroup_title}>{title}</div>
        <div className={classes.textGroup_value}>
          <div className="value">{numberWithCommas(value)}</div>
          <div className={`change ${change > 0 ? 'positive' : 'negative'}`}>
            {change > 0 ? '+' + numberWithCommas(change) : numberWithCommas(change)}%
          </div>
        </div>
      </div>
      <div className={classes.icon_box}>
        <div className={classes.icon} style={{ backgroundImage: `url(${icon})` }}></div>
      </div>
    </div>
  );
};

export default DashboardItem;
