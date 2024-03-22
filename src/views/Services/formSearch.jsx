import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { Box, InputAdornment } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import InputField from 'components/CustomField/InputField';

const propTypes = {};

const useStyles = makeStyles((theme) => {
  return {
    filter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: '20px 0',
    },
    inputFilter: {
      width: '70%',
      paddingRight: 12,
    },
    inputFilterInner: {
      '& > div': {
        background: theme.custom.colors.white,
      },
    },
    btnFilter: {
      width: '30%',
      '& button': {
        width: '100%',
      },
    },
  };
});

const FormSearch = ({ handleSearch }) => {
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
        onSubmit={(values) => {
          handleSearch('searchText')(values.searchValue);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classes.filter}>
              <Box className={classes.inputFilter}>
                <Field
                  className={classes.inputFilterInner}
                  name="searchValue"
                  placeholder={t('common:search')}
                  component={InputField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CommonIcons.Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box className={classes.btnFilter}>
                <CommonStyles.Button type="submit">{t('common:search')}</CommonStyles.Button>
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
