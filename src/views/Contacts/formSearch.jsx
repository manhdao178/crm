import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box, InputAdornment } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import useToggleDialog from 'hooks/useToggleDialog';
import HeaderModal from './Modal/ModalAdd/HeaderModal';
import ContentModal from './Modal/ModalAdd/ContentModal';
import SelectField from 'components/CustomField/SelectField';
import Sort from 'assets/IconsSVG/UserList/Sort.svg';
import { useRef } from 'react';
import Timer from 'helpers/timer';
import { useEffect } from 'react';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';

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
      // width: '80%',
      flex: 1,
      // paddingLeft: 12,
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
    },
    inputFilterInner: {
      '& > div': {
        background: theme.custom.colors.white,
      },
    },
    btnAdd: {
      width: '20%',
      marginRight: 12,
      '& button': {
        width: '100%',
      },
    },
    btnAddIcon: {
      marginRight: '12px',
      borderRadius: '12px',
      background: theme.custom.colors.white,
      color: theme.custom.colors.blackblue,
    },
    selectContainer: {
      flexGrow: 1,
      borderRadius: '12px',
      backgroundColor: theme.custom.colors.white,
      border: 'solid 1px #C6CCD3',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 12px',
      '& div': {
        '&:nth-child(2)': {
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        },
      },
    },
    inputContainer: {
      flexGrow: 6,
    },
    selectBox: {
      '& fieldset': {
        border: 0,
      },
      '& div': {
        color: '#434D56',
        display: 'flex',
        alignItems: 'center',
      },
    },
    selectIcon: {
      width: '24px',
      height: '24px',
      background: `url(${Sort}) no-repeat center center`,
      backgroundSize: 'cover',
      marginRight: '12px',
    },
    btnFilter: {
      width: '20%',
      '& button': {
        width: '100%',
        padding: '11px 24px',
      },
    },
  };
});

const FormSearch = ({ handleSearch, refetch = () => {}, status }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const timer = useRef(new Timer());
  const formikRef = useRef();
  const { tabPageLead } = useContactPageLead();

  const { open: openAdd, toggle: toggleAdd, shouldRender: shouldRenderAdd } = useToggleDialog();

  const sortOptions =
    status === 'Booked'
      ? [{ value: 'fullname:asc', label: `${t('common:permission_name')}` }]
      : [{ value: 'fullname:asc', label: `${t('common:permission_name')}` }];

  //! Function
  const onSearch = (values) => {
    handleSearch('searchText')(values.searchText);
    handleSearch('sort')(`${values.sort}`);
  };

  useEffect(() => {
    formikRef.current &&
      formikRef.current.resetForm({
        values: {
          searchText: '',
          sort: 'desc',
        },
      });
  }, [status]);

  //! Render
  return (
    <div className={classes.filter}>
      {/* Render Modal Add Contact */}

      {tabPageLead === 'personal' ? (
        <div className={classes.btnAdd}>
          <CommonStyles.Button onClick={toggleAdd}>
            <CommonIcons.Add className={classes.btnAddIcon} />
            {t('common:add_key', { key: t('common:contacts') })}
          </CommonStyles.Button>
          {shouldRenderAdd && (
            <CommonStyles.Modal
              open={openAdd}
              toggle={toggleAdd}
              header={<HeaderModal toggle={toggleAdd} />}
              content={<ContentModal refetch={refetch} toggle={toggleAdd} />}
            />
          )}
        </div>
      ) : null}

      <Formik
        initialValues={{
          searchText: '',
          sort: 'desc',
        }}
        onSubmit={(values) => onSearch(values)}
        innerRef={formikRef}
      >
        {({ values, handleChange, submitForm }) => {
          return (
            <Form className={classes.inputFilter}>
              <Box className={classes.selectContainer}>
                <Box>
                  <Box className={classes.selectIcon}></Box>
                </Box>
                <Box>{t('common:sort_by')}</Box>
                <Box>
                  <Field
                    component={SelectField}
                    options={sortOptions}
                    className={classes.selectBox}
                    name="sort"
                    value={values.sort}
                    afterOnChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                  />
                </Box>
              </Box>
              <Box className={classes.inputContainer}>
                <Field
                  className={classes.inputFilterInner}
                  name="searchText"
                  onChange={(e) => {
                    handleChange(e);
                    timer.current.debounce(() => {
                      submitForm();
                    }, 1000);
                  }}
                  placeholder={t('common:contacts_placeholder_search')}
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

export default FormSearch;
