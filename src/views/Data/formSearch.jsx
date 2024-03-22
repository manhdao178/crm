import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box, InputAdornment } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import useToggleDialog from 'hooks/useToggleDialog';
import HeaderModal from './Modal/HeaderModal';
import ContentModal from './Modal/ContentModal';
import { useRef } from 'react';
import Timer from 'helpers/timer';
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
      display: 'flex',
      alignItems: 'center',
      // width: '80%',
      flex: 1,
      paddingRight: 12,
    },
    inputFilterWrap: {
      width: '80%',
    },
    inputFilterInner: {
      width: '100%',
      '& > div': {
        background: theme.custom.colors.white,
      },
    },
    btnAdd: {
      width: '20%',
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
    btnFilter: {
      width: '20%',
      '& button': {
        width: '100%',
        padding: '12px 24px',
      },
      marginLeft: '12px',
    },
  };
});

const FormSearch = ({ handleSearch, refetch, status }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const timer = useRef(new Timer());

  const { open: openAdd, toggle: toggleAdd, shouldRender: shouldRenderAdd } = useToggleDialog();
  //! Function

  const onSearch = (values) => {
    handleSearch('searchText')(values.searchText);
  };

  //! Render
  return (
    <div className={classes.filter}>
      <Formik
        initialValues={{
          searchText: '',
        }}
        onSubmit={(values) => onSearch(values)}
      >
        {({ values, setFieldValue, handleChange, submitForm }) => {
          return (
            <Form className={classes.inputFilter}>
              <Box className={classes.inputFilterWrap}>
                <Field
                  className={classes.inputFilterInner}
                  name="searchText"
                  onChange={(e) => {
                    handleChange(e);
                    timer.current.debounce(() => {
                      submitForm();
                    }, 1000);
                  }}
                  placeholder={t('common:data_placeholder_search')}
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

      {/* Render Modal Add Data */}

      {status === 'personal' ? (
        <div className={classes.btnAdd}>
          <CommonStyles.Button onClick={toggleAdd}>
            <CommonIcons.Add className={classes.btnAddIcon} />
            {t('common:add_key', { key: t('common:data') })}
          </CommonStyles.Button>
          {shouldRenderAdd && (
            <CommonStyles.Modal
              open={openAdd}
              toggle={toggleAdd}
              header={<HeaderModal toggle={toggleAdd} />}
              content={<ContentModal toggle={toggleAdd} refetch={refetch} />}
              footer={<></>}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FormSearch;
