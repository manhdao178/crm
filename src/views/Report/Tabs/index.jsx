import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import classNames from 'classnames';
import CommonStyles from 'components/CommonStyles';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => {
  return {
    buttonGroup: {
      display: 'flex',
      gap: '8px',
    },
    buttonValue: {
      color: 'rgba(21, 20, 57, 0.7) !important',
      background: `${theme.custom.colors.white} !important`,
      border: `1px solid ${theme.custom.colors.lightgreen} !important`,
      flex: 1,
    },
    active: {
      background: `${theme.custom.colors.green} !important`,
      color: `${theme.custom.colors.white} !important`,
    },
  };
});

const Tabs = ({ listItem }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render

  return (
    <Box className={classes.buttonGroup}>
      {listItem.map((el, index) => {
        return (
          <CommonStyles.Button
            key={el.label}
            onClick={el.onClick}
            disabled={el.disabled}
            className={classNames(classes.buttonValue, { [classes.active]: el.isActive })}
          >
            {el.label}
          </CommonStyles.Button>
        );
      })}
    </Box>
  );
};

export default memo(Tabs);
