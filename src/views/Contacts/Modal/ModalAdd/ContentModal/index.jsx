import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { Box, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import { REQUIRED_FIELD } from 'helpers/messages';
import * as Yup from 'yup';
import i18n from 'i18n';
import DatePickerField from 'components/CustomField/DatePickerField';
import TextAreaField from 'components/CustomField/TextAreaField';
import { showError, showSuccess } from 'helpers/toast';
import { useAddContactsTeleSale } from 'hooks/leads/useAddContactsTeleSale';
import { roles } from 'constants';
import { useAddContactsLeadTeleSale } from 'hooks/leads/useAddContactsLeadTeleSale';
import { useAuthentication } from 'providers/AuthenticationProvider';
import { convertTime } from 'helpers/date';
import ServiceBranch from 'components/ServiceBranch';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';
import CheckboxField from 'components/CustomField/CheckboxField';
import BranchServiceReception from 'components/LayoutReceptionist/components/BranchServiceReception';
import { checkHeadNumber } from 'helpers/validation';

const useStyles = makeStyles((theme) => {
  return {
    serviceAndBranch: {
      display: 'flex',
      gap: '15px',
      '& label': {
        color: `${theme.custom.colors.black} !important`,
      },
    },
  };
});

const ContentModal = ({ toggle, refetch = () => {} }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { userInfo } = useAuthentication();
  const role = userInfo?.userRoleDetail?.key || '';
  const { isLoading: loadingAddContactTeleSale, mutateAsync: addContactTeleSale } = useAddContactsTeleSale();
  const { isLoading: loadingAddContactLeadTeleSale, mutateAsync: addContactLeadTeleSale } =
    useAddContactsLeadTeleSale();
  const queryClient = useQueryClient();

  //! Function
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required(REQUIRED_FIELD(i18n.t('common:contacts_customerName'))),
    phoneNumber: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:contacts_numberPhone')))
      .test('startNumber', `${t('common:userlist_phoneNumberStart')}`, async (val) => checkHeadNumber(val))
      .min(10, t('common:contacts_phoneNumberLength')),
    service: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:contacts_service')))
      .nullable(),
    branch: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:contacts_branch')))
      .nullable(),
  });

  const handleAddContacts = async (values, resetForm) => {
    try {
      const bodyRequestTeleSale = {
        fullname: values?.fullname,
        phoneNumber: values?.phoneNumber,
        link: values?.link,
        service: values?.service?.value,
        branch: values?.branch?.value,
        note: values?.note,
        isHotNumber: values?.isHotNumber,
      };

      const bodyRequestLeadTeleSale = {
        fullname: values?.fullname,
        phoneNumber: values?.phoneNumber,
        link: values?.link,
        service: values?.service,
        branch: values?.branch,
        leaderNote: values?.note,
      };
      const res =
        // role === roles.TELESALE_LEAD
        //   ? await addContactLeadTeleSale(bodyRequestLeadTeleSale)
        //   :
        await addContactTeleSale(bodyRequestTeleSale);
      if (res) {
        showSuccess(t('common:contacts_msg_success_add'));
        resetForm();
        toggle();
      }
      refetch();
    } catch (error) {
      showError(error?.response.data.messages[0] || t('common:contacts_msg_error_add'));
    }
    await queryClient.refetchQueries([queryKeys.leads]);
  };

  //! Render
  return (
    <Box>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          fullname: '',
          phoneNumber: '',
          link: '',
          service: '',
          branch: '',
          note: '',
          isHotNumber: false,
        }}
        onSubmit={(values, { resetForm }) => {
          handleAddContacts(values, resetForm);
        }}
      >
        {(propsFormik) => (
          <Form style={{ maxWidth: '1200px' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Field
                  value={convertTime(new Date())}
                  component={DatePickerField}
                  label={t('common:contacts_fractionDate')}
                  name="fractionDate"
                  placeholder={t('common:contacts_fractionDate')}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={InputField}
                  label={t('common:contacts_customerName')}
                  name="fullname"
                  placeholder={t('common:contacts_customerName')}
                  disabled={loadingAddContactTeleSale || loadingAddContactLeadTeleSale}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={InputField}
                  label={t('common:contacts_numberPhone')}
                  name="phoneNumber"
                  placeholder={t('common:contacts_numberPhone')}
                  disabled={loadingAddContactTeleSale || loadingAddContactLeadTeleSale}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={InputField}
                  label={t('common:contacts_link')}
                  name="link"
                  placeholder={t('common:contacts_link')}
                  disabled={loadingAddContactTeleSale || loadingAddContactLeadTeleSale}
                />
              </Grid>
              <Grid item xs={8}>
                <div className={classes.serviceAndBranch}>
                  <BranchServiceReception />
                </div>
              </Grid>
              <Grid item xs={4}>
                <Field component={CheckboxField} label={t('common:contacts_hotNumber')} name="isHotNumber" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextAreaField}
                  minRows={10}
                  label={t('common:contacts_note')}
                  name="note"
                  placeholder={t('common:contacts_note')}
                  disabled={loadingAddContactTeleSale || loadingAddContactLeadTeleSale}
                />
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <CommonStyles.Button type="reset" variant="outlined" onClick={toggle}>
                  {t('common:cancel')}
                </CommonStyles.Button>
                <CommonStyles.Button
                  disabled={loadingAddContactTeleSale || loadingAddContactLeadTeleSale}
                  type="submit"
                >
                  {t('common:save')}
                </CommonStyles.Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContentModal;
