import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    CellItem: {
      maxWidth: '200px',
      // width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
});

const CellItem = ({ data, emptyTitle = '-' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <Tooltip title={data || ''}>
      <div className={classes.CellItem}>{data ? data : emptyTitle}</div>
    </Tooltip>
  );
};

export default CellItem;
