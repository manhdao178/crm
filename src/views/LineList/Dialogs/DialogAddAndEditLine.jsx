import React, { Fragment } from 'react';
import useToggleDialog from 'hooks/useToggleDialog';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, Form, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import { makeStyles } from '@mui/styles';
import * as Yup from 'yup';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { REQUIRED_FIELD } from 'helpers/messages';
import i18n from 'i18n';
import CustomField from 'components/CustomField';
import { loadOptionsLineAsync } from 'helpers/loadOptionsAsync';
import { useGetListProjectOptions } from 'hooks/project/useGetProjectOptions';

const useStyles = makeStyles((theme) => {
  return {
    bottom: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      '& .MuiButtonBase-root': {
        minWidth: '104px',
        padding: '6px ',
      },
    },
    loading: {
      width: '20px !important',
      height: '20px !important',
    },
  };
});

const DialogAddAndEditLine = ({ open, toggle, onSubmit, item, isLoading }) => {
  //! State
  const { t } = useTranslation();
  const classes = useStyles();
  const { data: resProjectList, isLoading: isLoadingProjectList } = useGetListProjectOptions();
  const projectList = resProjectList?.data?.data || [];

  const projectListOptions = projectList
    ?.map((item) => ({ ...item, value: item?.label }))
    ?.filter((item) => {
      if (item) return true;
      return false;
    });

  const telesales = item?.telesaleDetails?.map((ele) => ({ value: ele.id, label: ele.fullname })) || [];
  const initValuesForm = !!item
    ? { name: item.name, password: item.password, type: item.type, telesales: telesales }
    : {
        name: '',
        password: '',
        type: null,
        telesales: [],
      };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED_FIELD(i18n.t('common:line_name'))),
    password: Yup.string().required(REQUIRED_FIELD(i18n.t('common:line_password'))),
    type: Yup.string().required(REQUIRED_FIELD(i18n.t('common:line_type'))),
    telesales: Yup.string().required(REQUIRED_FIELD(i18n.t('common:line_ID_Tele'))),
  });

  //! Function

  const projectSelected = (projectName) => {
    const projectSelect = projectList.filter((item) => item?.label === projectName);
    return projectSelect[0]?.value;
  };

  const ContentDialog = () => {
    return (
      <Fragment>
        <Formik
          initialValues={initValuesForm}
          onSubmit={(values) => {
            const telesalesConvert = values.telesales.map((item) => item.value);
            const valuesConvert = { ...values, telesales: telesalesConvert };
            onSubmit(valuesConvert);
          }}
          validationSchema={validationSchema}
        >
          {({ values, initialValues, touched }) => {
            return (
              <Form style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 500 }}>
                <Field name="name" LabelColorPrimary component={InputField} label={t('common:line_name')} />
                <Field name="password" LabelColorPrimary component={InputField} label={t('common:line_password')} />
                <Field
                  name="type"
                  LabelColorPrimary
                  options={projectListOptions}
                  component={CustomField.SelectField}
                  label={t('common:line_type')}
                />

                <Field
                  disabled={!values.type}
                  name="telesales"
                  label="ID Tele"
                  LabelColorPrimary
                  multiple
                  component={CustomField.AutocompleteAsyncField}
                  roleOption="TELESALE,TELESALE_LEAD"
                  loadOptionsByRequest={loadOptionsLineAsync}
                  valueProject={projectSelected(values.type)}
                />

                <div className={classes.bottom}>
                  <CommonStyles.Button variant="outlined" onClick={toggle} disabled={isLoading}>
                    {t('common:cancel')}
                  </CommonStyles.Button>
                  <CommonStyles.Button type="submit" disabled={isLoading}>
                    {isLoading ? <CircularProgress className={classes.loading} /> : t('common:save')}
                  </CommonStyles.Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Fragment>
    );
  };

  //!Render
  return <CommonStyles.Modal open={open} toggle={toggle} content={ContentDialog()} />;
};

export default DialogAddAndEditLine;
