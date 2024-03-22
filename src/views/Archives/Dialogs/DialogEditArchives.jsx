import React, { Fragment } from 'react';
import useToggleDialog from 'hooks/useToggleDialog';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, Form, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import { makeStyles } from '@mui/styles';
import * as Yup from 'yup';
import { CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { REQUIRED_FIELD } from 'helpers/messages';
import i18n from 'i18n';
import CustomField from 'components/CustomField';
import { loadOptionsLineAsync } from 'helpers/loadOptionsAsync';
import ServiceBranch from 'components/ServiceBranch';
import { convertTime } from 'helpers/date';
import DatePickerField from 'components/CustomField/DatePickerField';
import TextAreaField from 'components/CustomField/TextAreaField';
import DateField from 'components/CustomField/DateField';
import { checkHeadNumber } from 'helpers/validation';

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
    serviceAndBranch: {
      display: 'flex',
      gap: '15px',
    },
  };
});

const DialogEditArchives = ({ open, toggle, onSubmit, item, isLoading }) => {
  //! State
  const { t } = useTranslation();
  const classes = useStyles();

  const initValuesForm = !!item
    ? {
        interactiveDate: item.interactiveDate,
        fullname: item.fullname,
        phoneNumber: item.phoneNumber,
        link: item.link,
        service: item.service,
        branch: item.branch,
        note: item.note,
        id: item._id,
      }
    : {
        interactiveDate: null,
        fullname: '',
        phoneNumber: '',
        link: '',
        service: '',
        branch: '',
        note: '',
      };
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required(REQUIRED_FIELD(i18n.t('archives_customerName'))),
    phoneNumber: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:archives_numberPhone')))
      .test('startNumber', `${t('common:userlist_phoneNumberStart')}`, async (val) => checkHeadNumber(val)),
    service: Yup.string().required(REQUIRED_FIELD(i18n.t('common:archives_service'))),
    branch: Yup.string().required(REQUIRED_FIELD(i18n.t('common:archives_branch'))),
  });

  //! Function
  const ContentDialog = () => {
    return (
      <Fragment>
        <Formik
          initialValues={initValuesForm}
          onSubmit={(values) => {
            onSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {({ values, initialValues, touched }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      component={DateField}
                      label={t('common:archives_fractionDate')}
                      name="interactiveDate"
                      placeholder={t('common:archives_fractionDate')}
                      LabelColorPrimary
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={InputField}
                      label={t('common:archives_customerName')}
                      name="fullname"
                      placeholder={t('common:archives_customerName')}
                      LabelColorPrimary
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={InputField}
                      label={t('common:archives_numberPhone')}
                      name="phoneNumber"
                      placeholder={t('common:archives_numberPhone')}
                      LabelColorPrimary
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={InputField}
                      label={t('common:archives_link')}
                      name="link"
                      placeholder={t('common:archives_link')}
                      LabelColorPrimary
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.serviceAndBranch}>
                      <ServiceBranch
                        placeholder={{ service: t('common:archives_service'), branch: t('common:archives_branch') }}
                        disabled
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextAreaField}
                      minRows={10}
                      label={t('common:archives_note')}
                      name="note"
                      placeholder={t('common:archives_note')}
                      LabelColorPrimary
                    />
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <CommonStyles.Button type="reset" variant="outlined" onClick={toggle}>
                      {t('common:cancel')}
                    </CommonStyles.Button>
                    <CommonStyles.Button type="submit">{t('common:save')}</CommonStyles.Button>
                  </Grid>
                </Grid>
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

export default DialogEditArchives;
