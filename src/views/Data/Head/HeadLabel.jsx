import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box } from '@mui/material';
import ActionFilterHeader from '../Components/ActionFilterHeader';

const useStyles = makeStyles((theme) => {
  return {
    boxHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});

const HeadLabel = ({ label = 'label', title }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <Box className={classes.boxHeader}>
      {`${t(`common:${label}`)}`}
      {title && <ActionFilterHeader title={title} label={label} />}
    </Box>
  );
};

export default HeadLabel;
