import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => {
  return {};
});

const HeadLabel = ({ label = 'label' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return `${t(`common:${label}`)}`;
};

export default HeadLabel;
