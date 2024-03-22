import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import moment from 'moment/moment';

const useStyles = makeStyles((theme) => {
  return {
    CellDate: {
      maxWidth: '140px',
      minWidth: '140px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
});

const CellDate = ({ data }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return <div className={classes.CellDate}>{data ? moment(data).format('DD/MM/YYYY') : '-'}</div>;
};

export default CellDate;
