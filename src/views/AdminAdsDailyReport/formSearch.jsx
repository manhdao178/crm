import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { Box, Grid, InputAdornment } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import InputField from 'components/CustomField/InputField';
import ServiceBranch from 'components/ServiceBranch';

const propTypes = {};

const useStyles = makeStyles((theme) => {
  return {
    filter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: '0 0 20px 0',
    },
    inputFilter: {
      width: '40%',
      paddingRight: 12,
    },
    inputFilterInner: {
      '& > div': {
        background: theme.custom.colors.white,
      },
    },
    btnFilter: {
      width: '20%',
      textAlign: 'right',
      '& button': {
        // width: '100%',
        padding: '11px 15px',
      },
    },
    serviceAndBranch: {
      display: 'flex',
      gap: '15px',
      '& label': {
        color: `${theme.custom.colors.black} !important`,
      },
    },
    titleHeader: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px',
      fontSize: '20px',
      fontWeight: '600',
    },
  };
});

const FormSearch = ({}) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  //! Function

  //! Render
  return (
    <div className={classes.filter}>
      <Formik
        initialValues={{
          searchValue: '',
          sort: 'desc',
        }}
        onSubmit={(values) => {}}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classes.filter}>
              <Grid container>
                <div className={classes.titleHeader}>Báo cáo theo :</div>
                <Grid item xs={6}>
                  <div className={classes.serviceAndBranch}>
                    <ServiceBranch
                      label={{ branch: '', service: '' }}
                      placeholder={{ service: t('common:contacts_service'), branch: t('common:contacts_branch') }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Box className={classes.btnFilter}>
                <CommonStyles.Button type="submit">
                  {t('common:export_excel')}&ensp; <CommonIcons.FileDownloadIcon></CommonIcons.FileDownloadIcon>{' '}
                </CommonStyles.Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

FormSearch.propTypes = propTypes;
export default FormSearch;
