import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import moment from 'moment/moment';

const useStyles = makeStyles((theme) => {
  return {
    CellDate: {
      maxWidth: '120px',
      // width: '120px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
});

const CellDate = ({ data, sx, hasTime }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <div style={sx} className={classes.CellDate}>
      {data ? moment(new Date(data)).format(hasTime ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY') : '-'}
    </div>
  );
};

export default CellDate;
