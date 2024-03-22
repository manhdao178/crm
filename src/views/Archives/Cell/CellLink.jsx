import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    CellLinkText: {
      color: theme.custom.colors.lightblue,
      maxWidth: '100px',
      minWidth: '100px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: '#008638 !important',
    },
  };
});

const CellLink = ({ data, emptyTitle = 'Không có link' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <Tooltip title={data || ''}>
      <div className={classes.CellLinkText}>
        {data ? (
          <a target="_blank" href={`${data}`} rel="noreferrer">
            Link
          </a>
        ) : (
          emptyTitle
        )}
      </div>
    </Tooltip>
  );
};

export default CellLink;
