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
import httpServices from 'services/httpServices';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import { useEditAppointment } from 'hooks/appointment/useEditAppointment';
import moment from 'moment';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';
import { showError, showSuccess } from 'helpers/toast';

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

const ModalEditAppointment = ({ open, toggle, onSubmit, item, isLoading }) => {
  //! State
  const { t } = useTranslation();
  const classes = useStyles();
  const queryClient = useQueryClient();

  const project = httpServices.getServiceStorage();
  const { data: branchOption } = useGetBranchOptions({ project: project, service: item.detail?.service });
  const branchOptions = branchOption?.data?.data || [];

  const { isLoading: editingAppointment, mutateAsync: editAppointment } = useEditAppointment();

  const initValuesForm = { branch: item?.detail?.branch, date: item?.detail?.date };
  const validationSchema = Yup.object().shape({
    branch: Yup.string().required(t('common:is_required_field', { key: t('common:branch') })),
    date: Yup.string()
      .required(t('common:is_required_field', { key: t('common:contacts_bookingForCustomerDate') }))
      .nullable(true),
  });

  //! Function

  const handleEditAppointment = async (values) => {
    try {
      await editAppointment({ id: item.id, ...values });
      showSuccess('Sửa lịch hẹn thành công');
      await queryClient.refetchQueries([queryKeys.appointmentmy]);
      toggle();
    } catch (error) {
      console.log('error: ', error);
      showError('Sửa lịch hẹn thất bại');
    }
  };

  const ContentDialog = () => {
    return (
      <Fragment>
        <Formik
          initialValues={initValuesForm}
          onSubmit={(values) => {
            const dateConvert = new Date(values.date).toISOString();
            handleEditAppointment({ ...values, date: dateConvert });
          }}
          validationSchema={validationSchema}
        >
          {({ values, initialValues, touched }) => {
            return (
              <Form style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 500 }}>
                <Field
                  label={t('common:branch')}
                  LabelColorPrimary
                  name="branch"
                  component={CustomField.SelectField}
                  options={branchOptions}
                />
                <Field
                  label="Ngày đặt lịch hẹn"
                  LabelColorPrimary
                  name="date"
                  component={CustomField.DatePickerField}
                  minutesStep={30}
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

export default ModalEditAppointment;
