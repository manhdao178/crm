import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    CellComment: {
      maxWidth: '25px',
      minWidth: '25px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: theme.custom.colors.red,
    },
  };
});

const CellComment = ({ data, emptyTitle = 'N/A' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return <div className={classes.CellComment}>{data ? <CommonIcons.ErrorIcon /> : ''}</div>;
};

export default CellComment;
