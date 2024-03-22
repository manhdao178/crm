import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { Box, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import * as Yup from 'yup';
import DatePickerField from 'components/CustomField/DatePickerField';
import RadioField from 'components/CustomField/RadioField';
import { checkHeadNumber } from 'helpers/validation';
import { showError, showSuccess } from 'helpers/toast';
import { convertTime } from 'helpers/date';
import { useAddAppointmentLead } from 'hooks/leads/useAddAppointmentLead';
import ServiceBranch from 'components/ServiceBranch';
import moment from 'moment';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';
import BranchServiceReception from 'components/LayoutReceptionist/components/BranchServiceReception';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import httpServices from 'services/httpServices';
import { useGetReceptions } from 'hooks/receptions/useGetReceptions';
import TextAreaField from 'components/CustomField/TextAreaField';

const useStyles = makeStyles((theme) => {
  return {
    btnGroup: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      marginTop: '32px',
      gap: '16px',
    },
  };
});

const ContentModalAddCalendar = ({ toggle, item }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const project = httpServices.getServiceStorage();

  const { isLoading: isAddingAppointment, mutateAsync: addAppointment } = useAddAppointmentLead();
  const { data: resBranchOption } = useGetBranchOptions({ project: project });
  const branchOption = resBranchOption?.data?.data || [];
  const { data: resServiceOption } = useGetReceptions({ project: project });
  const serviceOption = resServiceOption?.data?.data || [];

  const initBranch = branchOption.filter((ele) => item?.branch === ele.value)[0];
  const initService = serviceOption.filter((ele) => item?.service === ele.value)[0];

  const optionsGender = [
    { label: 'Nam', value: '0' },
    { label: 'Nữ', value: '1' },
  ];

  const initialValues = {
    date: convertTime(new Date()),
    fullname: item?.fullname || '',
    phoneNumber: item?.phoneNumber || '',
    gender: item?.gender || '0',
    // service: item?.service || '',
    // branch: item?.branch || '',
    service: initService,
    branch: initBranch,
    note: '',
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required(t('common:is_required_field', { key: t('common:profile_fullname') }))
      .max(20, t('common:userlist_fullNameLength')),
    phoneNumber: Yup.string()
      .required(t('common:is_required_field', { key: t('common:profile_phoneNumber') }))
      .test('startNumber', `${t('common:userlist_phoneNumberStart')}`, async (val) => checkHeadNumber(val))
      .min(10, t('common:userlist_phoneNumberLength')),
    branch: Yup.string()
      .required(t('common:is_required_field', { key: t('common:contacts_service') }))
      .nullable(),
    service: Yup.string()
      .required(t('common:is_required_field', { key: t('common:contacts_service') }))
      .nullable(),
  });
  //! Function
  const handleAddAppointment = async (values) => {
    const payload = {
      id: item?._id,
      fullname: values?.fullname,
      phoneNumber: values.phoneNumber,
      gender: values?.gender,
      // service: values?.service,
      // branch: values?.branch,
      branch: values?.branch?.value,
      service: values?.service?.value,
      date: moment(values?.date),
      note: values?.note,
    };
    try {
      await addAppointment(payload);
      toggle();
      showSuccess(t('common:appointment_addSuccess'));
      queryClient.refetchQueries([queryKeys.appointmentmy]);
    } catch (error) {
      showError(error?.response?.data.messages[0] || t('common:appointment_addError'));
    }
  };

  //! Render
  return (
    <Box sx={{ width: '600px' }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => {
          handleAddAppointment(values);
        }}
      >
        {({ errors, values }) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={InputField}
                    label={t('common:contacts_bookingForCustomerName')}
                    name="fullname"
                    placeholder={t('common:contacts_bookingForCustomerName')}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={RadioField}
                    label={t('common:contacts_bookingForCustomerGender')}
                    name="gender"
                    placeholder={t('common:contacts_bookingForCustomerGender')}
                    options={optionsGender}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={InputField}
                    label={t('common:contacts_bookingForCustomerNumberPhone')}
                    name="phoneNumber"
                    placeholder={t('common:contacts_bookingForCustomerNumberPhone')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <ServiceBranch /> */}
                  <BranchServiceReception />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={DatePickerField}
                    label={t('common:contacts_bookingForCustomerDate')}
                    name="date"
                    placeholder={t('common:contacts_bookingForCustomerDate')}
                    minDate={new Date()}
                    minutesStep={30}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextAreaField}
                    minRows={4}
                    label={t('common:contacts_note')}
                    name="note"
                    placeholder={t('common:contacts_note')}
                  />
                </Grid>
              </Grid>
              <div className={classes.btnGroup}>
                <CommonStyles.Button variant="outlined" onClick={toggle} loading={isAddingAppointment}>
                  {t('common:close')}
                </CommonStyles.Button>
                <CommonStyles.Button type="submit" loading={isAddingAppointment}>
                  {t('common:contacts_add_new')}
                </CommonStyles.Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ContentModalAddCalendar;
