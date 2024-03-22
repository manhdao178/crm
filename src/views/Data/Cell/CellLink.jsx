import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    CellLink: {},
    CellLinkText: {
      color: theme.custom.colors.lightblue,
    },
  };
});

const CellLink = ({ data, emptyTitle = 'N/A' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <Tooltip title={data || ''}>
      <div className={classes.CellLink}>
        {data ? (
          <a className={classes.CellLinkText} target="_blank" href={`${data}`} rel="noreferrer">
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
