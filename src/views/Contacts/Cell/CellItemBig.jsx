import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    CellItemBig: {
      maxWidth: '150px',
      minWidth: '150px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
});

const CellItemBig = ({ data, emptyTitle = 'N/A' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <Tooltip title={data || ''}>
      <div className={classes.CellItemBig}>{data ? data : emptyTitle}</div>
    </Tooltip>
  );
};

export default CellItemBig;
