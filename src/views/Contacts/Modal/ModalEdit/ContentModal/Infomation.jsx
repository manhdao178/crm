import React, { useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Grid, InputAdornment } from '@mui/material';
import * as Yup from 'yup';
import { REQUIRED_FIELD } from 'helpers/messages';
import i18n from 'i18n';
import { Field, Form, Formik, useFormikContext } from 'formik';
import InputField from 'components/CustomField/InputField';
import SelectField from 'components/CustomField/SelectField';
import TextAreaField from 'components/CustomField/TextAreaField';
import { useGetStatusOptions } from 'hooks/status/useGetStatusOptions';
import FooterModal from '../FooterModal';
import { useEditContacts } from 'hooks/leads/useEditContacts';
import { showError, showSuccess } from 'helpers/toast';
import { useCall } from 'providers/CallProvider';
import ServiceBranch from 'components/ServiceBranch';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';
import moment from 'moment';
import { checkHeadNumber, filterChangedField } from 'helpers/validation';
import CustomField from 'components/CustomField';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import { useGetQualityOption } from 'hooks/leads/useGetQualityOption';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import BranchServiceReception from 'components/LayoutReceptionist/components/BranchServiceReception';
import httpServices from 'services/httpServices';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import { useGetReceptions } from 'hooks/receptions/useGetReceptions';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => {
  return {
    serviceAndBranch: {
      display: 'flex',
      gap: '15px',
    },
    deleteSelect: {
      '& .icon': {
        fontSize: '15px',
      },
      '&:hover': {
        cursor: 'pointer  ',
      },
    },
  };
});

const empty = () => {
  return <div></div>;
};

const Infomation = ({ data = {}, role = '', refetch = () => {}, toggle, toggleAddCalendar }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { tabPageLead } = useContactPageLead();
  const { onClickOpenAndCall } = useCall();
  const { data: dataStatus } = useGetStatusOptions();
  const optionsStatus = dataStatus?.data?.data || [];
  const formikRef = useRef();
  const queryClient = useQueryClient();
  // const { values, setFieldValue } = useFormikContext();
  const { data: dataQualityOption } = useGetQualityOption();
  const quanlityOption = dataQualityOption?.data?.data || [];
  const [quanlityOp, setQuanlityOp] = useState(data?.quality);
  const [quanlitySe, setQuanlitySe] = useState('');

  const project = httpServices.getServiceStorage();
  const { data: resBranchOption } = useGetBranchOptions({ project: project });
  const branchOption = resBranchOption?.data?.data || [];
  const { data: resServiceOption } = useGetReceptions({ project: project });
  const serviceOption = resServiceOption?.data?.data || [];

  const initBranch = branchOption.filter((ele) => data?.branch === ele.value)[0];
  const initService = serviceOption.filter((ele) => data?.service === ele.value)[0];

  const clearable = !isEmpty(quanlityOp) || !isEmpty(quanlitySe);

  const options = [
    {
      value: 'NEW',
      label: 'Khách hàng mới',
    },
    {
      value: 'POTENTIAL',
      label: 'Khách hàng tiềm năng',
    },
    {
      value: 'UNPROMISING',
      label: 'Không quan tâm',
    },
  ];

  const { isLoading: isEditingContact, mutateAsync: editContact } = useEditContacts();
  //! Function
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required(REQUIRED_FIELD(i18n.t('common:userlist_fullName'))),
    // phoneNumber: Yup.string()
    //   .required(t('common:is_required_field', { key: t('common:userlist_phone') }))
    //   .test('startNumber', `${t('common:userlist_phoneNumberStart')}`, async (val) => checkHeadNumber(val))
    //   .min(10, t('common:userlist_phoneNumberLength')),
    service: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:contacts_service')))
      .nullable(),
    branch: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:contacts_branch')))
      .nullable(),
  });

  const roleHasCommentLead = ['TELESALE_LEAD'];
  const commentLeadPermission = !roleHasCommentLead.includes(role);
  const allowEdit = tabPageLead === 'personal';

  const handleSubmit = async (values) => {
    const payload = filterChangedField(
      {
        interactiveDate: values?.interactiveDate,
        fullname: values?.fullname,
        phoneNumber: values?.phoneNumber,
        link: values?.link,
        status: values?.status,
        quality: values?.quality,
        service: values?.service?.value,
        branch: values?.branch?.value,
        note: values?.note,
        leaderNote: values?.leaderNote,
        callbackDate: values?.callbackDate,
      },
      formikRef.current.initialValues,
    );
    try {
      await editContact({ ...payload, _id: data?._id });
      showSuccess(t('common:contacts_msg_success_change'));
      toggle();
      const leadDetails = await queryClient.refetchQueries([queryKeys.leadsDetails]);
      const leads = await queryClient.refetchQueries([queryKeys.leads]);
      const leadsManage = await queryClient.refetchQueries([queryKeys.leads_Manage]);
      const leadsAppointment = await queryClient.refetchQueries([queryKeys.leadsAppointment]);
      await Promise.all([leadDetails, leads, leadsAppointment, leadsManage]);
      return;
    } catch (error) {
      showError(error?.response.data.messages[0] || t('common:contacts_msg_error_change'));
    }
  };

  const handleDelete = (setFieldValue) => {
    setFieldValue('quality', null);
    setQuanlityOp('');
    setQuanlitySe('');
  };

  const handleChange = (e) => {
    setQuanlitySe(e);
    setQuanlityOp(e);
  };

  //! Render
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        interactiveDate: data?.interactiveDate ? moment(data.interactiveDate).format('DD/MM/YYYY') : null,
        fullname: data?.fullname || '',
        phoneNumber: data?.phoneNumber || '',
        link: data?.link || '',
        status: data?.status || '',
        quality: data?.quality || null,
        service: initService || '',
        branch: initBranch || '',
        note: data?.note || '',
        leaderNote: data?.leaderNote || '',
        callbackDate: data?.callbackDate || null,
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      innerRef={formikRef}
      enableReinitialize
    >
      {(propsFormik) => {
        return (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  disabled={!allowEdit}
                  component={InputField}
                  label={t('common:contacts_customerName')}
                  name="fullname"
                  LabelColorPrimary
                  required
                  placeholder={t('common:contacts_customerName')}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  disabled
                  component={InputField}
                  label={t('common:contacts_fractionDate')}
                  name="interactiveDate"
                  LabelColorPrimary
                  placeholder={t('common:contacts_fractionDate')}
                />
              </Grid>
              <Grid item xs={3}>
                <Field
                  disabled={!allowEdit}
                  component={CustomField.DateField}
                  label={t('common:contacts_reCallDate')}
                  name="callbackDate"
                  LabelColorPrimary
                  minDate={new Date()}
                />
              </Grid>
              <Grid item xs={3}>
                <Field
                  disabled={!allowEdit}
                  label={t('common:contacts_quanlity')}
                  name="quality"
                  LabelColorPrimary
                  placeholder={t('common:contacts_quanlity')}
                  options={quanlityOption}
                  component={SelectField}
                  afterOnChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  endAdornment={
                    clearable && (
                      <InputAdornment
                        position="end"
                        className={classes.deleteSelect}
                        onClick={() => handleDelete(propsFormik.setFieldValue)}
                      >
                        <CommonStyles.Button variant="text" sx={{ padding: '5px', minWidth: '15px', width: '15px' }}>
                          <CommonIcons.ClearIcon className="icon" />
                        </CommonStyles.Button>
                      </InputAdornment>
                    )
                  }
                  IconComponent={clearable ? empty : CommonIcons.Dropdown}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  disabled
                  component={InputField}
                  label={t('common:contacts_link')}
                  name="link"
                  LabelColorPrimary
                  placeholder={t('common:contacts_link')}
                />
              </Grid>
              <Grid item xs={3}>
                <Field
                  // disabled={!allowEdit}
                  disabled
                  component={InputField}
                  label={t('common:contacts_numberPhone')}
                  name="phoneNumber"
                  LabelColorPrimary
                  placeholder={t('common:contacts_numberPhone')}
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <Field
                  disabled={!allowEdit}
                  label={t('common:contacts_status')}
                  name="status"
                  LabelColorPrimary
                  placeholder={t('common:contacts_status')}
                  options={options}
                  component={SelectField}
                />
              </Grid>

              <Grid item xs={6}>
                <div className={classes.serviceAndBranch}>
                  <BranchServiceReception disabledBranch disabledService />
                </div>
              </Grid>
              <Grid item xs={6}>
                <Field
                  // disabled={!allowEdit || !!data?.note}
                  disabled={!allowEdit}
                  component={TextAreaField}
                  minRows={10}
                  label={t('common:contacts_note')}
                  name="note"
                  LabelColorPrimary
                  placeholder={t('common:contacts_note')}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  disabled={allowEdit || isEditingContact}
                  component={TextAreaField}
                  minRows={10}
                  label={t('common:contacts_leaderNote')}
                  name="leaderNote"
                  LabelColorPrimary
                  placeholder={t('common:contacts_placeholder_leaderNote')}
                />
              </Grid>
              <Grid item xs={12}>
                <FooterModal
                  onClickCall={() => onClickOpenAndCall(data)}
                  onSaveInfo={propsFormik.handleSubmit}
                  disabled={isEditingContact}
                  toggleAddCalendar={toggleAddCalendar}
                />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Infomation;
