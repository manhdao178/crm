import React from 'react';
import useToggleDialog from 'hooks/useToggleDialog';
import { CircularProgress, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'components/CommonStyles/Modal';
import { makeStyles } from '@mui/styles';
import CommonStyles from 'components/CommonStyles';
import { useTranslation } from 'react-i18next';

const DialogDeleteLine = ({ open, toggle, handleDelete, isLoading }) => {
  //! State
  const { t } = useTranslation();

  //! Function

  //!Render
  return (
    <CommonStyles.Modal
      open={open}
      toggle={toggle}
      header={t('common:dialogDeleteLine_delelteHeader')}
      content={<div>{t('common:dialogDeleteLine_delelteConfirm')}</div>}
      footer={
        <React.Fragment>
          <CommonStyles.Button variant="outlined" onClick={toggle} disabled={isLoading}>
            {t('common:cancel')}
          </CommonStyles.Button>
          <CommonStyles.Button onClick={handleDelete} disabled={isLoading}>
            {isLoading ? <CircularProgress /> : t('common:delete')}
          </CommonStyles.Button>
        </React.Fragment>
      }
    />
  );
};

export default DialogDeleteLine;
