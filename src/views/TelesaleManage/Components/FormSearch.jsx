import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { Box, InputAdornment } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import InputField from 'components/CustomField/InputField';
import CustomField from 'components/CustomField';
import httpServices from 'services/httpServices';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import Sort from 'assets/IconsSVG/UserList/Sort.svg';

const propTypes = {};

const useStyles = makeStyles((theme) => {
  return {
    filter: {
      display: 'flex',
      gap: '12px',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: '20px 0',
    },
    inputFilter: {
      flex: 2,
    },
    // selectFilter: {
    //   flex: 1,

    //   '& .select_container': {
    //     height: '48px',
    //     borderRadius: '12px',
    //     backgroundColor: theme.custom.colors.white,
    //     border: 'solid 1px #C6CCD3',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 16,
    //     '& div': {
    //       '&:nth-child(2)': {
    //         [theme.breakpoints.down('md')]: {
    //           display: 'none',
    //         },
    //       },
    //     },
    //     '& .select_icon': {
    //       width: '24px',
    //       height: '24px',
    //       background: `url(${Sort}) no-repeat center center`,
    //       backgroundSize: 'cover',
    //       marginRight: '12px',
    //     },
    //     '& .select_box': {
    //       '& fieldset': {
    //         border: 0,
    //       },
    //       '& div': {
    //         color: '#434D56',
    //         height: '32px',
    //         display: 'flex',
    //         alignItems: 'center',
    //       },
    //     },
    //   },
    // },
    inputFilterInner: {
      background: theme.custom.colors.white,
    },
    btnFilter: {
      flex: 1,
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

  const project = httpServices.getServiceStorage();
  const { data: resBranchOption } = useGetBranchOptions({ project: project });
  const branchOption = resBranchOption?.data?.data || [];

  const [initValueForm, setInitValueForm] = useState({
    searchValue: '',
    // branch: '',
  });

  //! Function

  //! Render
  return (
    <div className={classes.filter}>
      <Formik
        initialValues={initValueForm}
        enableReinitialize
        onSubmit={(values) => {
          handleSearch('searchText')(values.searchValue);
        }}
      >
        {({ values, setFieldValue, handleChange, submitForm }) => {
          return (
            <Form className={classes.filter}>
              {/* <Box className={classes.selectFilter}>
                
                <Box className="select_container">
                  <Box>
                    <Box className="select_icon"></Box>
                  </Box>
                  <Box className={classes.sortBy}>{t('common:sort_by')}</Box>
                  <Box>
                    <Field
                      component={CustomField.SelectField}
                      options={[
                        { value: 'fullname:ASC', label: `${t('common:permission_name')}` },
                        { value: 'staffCode:ASC', label: 'Mã nhân viên' },
                        { value: 'userTitle:ASC', label: 'Chức vụ' },
                        { value: 'userRole:ASC', label: 'Chức danh' },
                      ]}
                      className="select_box"
                      name="sort"
                      // value={props.values.sort}
                      // afterOnChange={(e) => handleRequestSort('sort')(e.target.value)}
                    />
                  </Box>
                </Box>
              </Box> */}
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
