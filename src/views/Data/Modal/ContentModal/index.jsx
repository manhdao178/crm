import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box, Grid } from '@mui/material';
import { Field, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import { REQUIRED_FIELD } from 'helpers/messages';
import * as Yup from 'yup';
import { date } from 'yup';
import i18n from 'i18n';
import SelectField from 'components/CustomField/SelectField';
import TextAreaField from 'components/CustomField/TextAreaField';
import { useAddDataFanpage } from 'hooks/leads/useAddDataFanpage';
import { useRef } from 'react';
import moment from 'moment';
import { showError, showSuccess } from 'helpers/toast';
import { useGetOptions } from 'hooks/options/userGetOptions';
import CustomField from 'components/CustomField';
import ServiceBranch from 'components/ServiceBranch';
import httpServices from 'services/httpServices';
import { roles } from 'constants';
import CheckboxField from 'components/CustomField/CheckboxField';
import BranchServiceReception from 'components/LayoutReceptionist/components/BranchServiceReception';

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: 'desc',
  userRoleKey: 'PAGE_LEAD',
};

const useStyles = makeStyles((theme) => {
  return {
    btnFilter: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '30px !important',
    },
    btnCancel: {
      marginRight: '12px  !important',
      padding: '8px 40px !important',
      backgroundColor: '#fff !important',
      color: '#000 !important',
      border: '1px solid #ccc !important',
    },
    btnSubmit: {
      padding: '9px 40px !important',
    },
    serviceAndBranch: {
      display: 'flex',
      gap: '15px',
    },
  };
});

const ContentModal = ({ toggle = () => {}, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const formikRef = useRef();
  // const { data, success } = useGetReceptions();
  // const optionsReceptions = data?.data?.data;
  // const { data: resListBranch } = useGetBranchOptions('');
  // const branchOptions = resListBranch?.data.data;
  const user = httpServices.getUserInfoStorage();
  const userName = user?.fullname;
  const userID = user?.id;
  const userRole = user?.userRoleDetail?.key;
  const { isLoading: isAddingDataFanpage, mutateAsync: addDataFanpage } = useAddDataFanpage();

  //! Function
  const validationSchema = Yup.object().shape({
    interactiveDate: Yup.date()
      .required(REQUIRED_FIELD(i18n.t('common:data_interactiveDate')))
      .nullable(),
    fullname: Yup.string().required(REQUIRED_FIELD(i18n.t('common:data_name'))),
    link: Yup.string().required(REQUIRED_FIELD(i18n.t('common:data_link'))),
    service: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:data_service')))
      .nullable(),
    branch: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:data_branch')))
      .nullable(),
    fanpageUser: Yup.string().required(REQUIRED_FIELD(i18n.t('common:data_managerPage'))),
  });

  const handleSubmit = async (values) => {
    try {
      if (values.phoneNumber) {
        await addDataFanpage({
          interactiveDate: values.interactiveDate,
          fullname: values.fullname,
          phoneNumber: values.phoneNumber,
          link: values.link,
          service: values.service?.value,
          branch: values.branch?.value,
          note: values.note,
          fractionDate: values.fractionDate,
          fanpageIDs: values.fanpageIDs,
          fanpageUser: userID,
          isHotNumber: values.isHotNumber,
        });
      } else {
        await addDataFanpage({
          interactiveDate: values.interactiveDate,
          fullname: values.fullname,
          link: values.link,
          service: values.service?.value,
          branch: values.branch?.value,
          note: values.note,
          fractionDate: values.fractionDate,
          fanpageIDs: values.fanpageIDs,
          fanpageUser: userID,
          isHotNumber: values.isHotNumber,
        });
      }
      showSuccess(t('common:data_addSuccess'));
      await refetch();

      formikRef?.current.resetForm({
        values: {
          interactiveDate: moment().toDate(),
          fullname: '',
          phoneNumber: '',
          link: '',
          service: '',
          branch: '',
          note: '',
          fanpageUser: displayName(),
          fractionDate: moment().toDate(),
          fanpageIDs: '',
          isHotNumber: false,
        },
      });
    } catch (error) {
      showError(error?.response.data.messages[0]);
    }
    refetch();
  };

  const displayName = () => {
    if (userRole === roles.FANPAGE || userRole === roles.PAGE_LEAD) {
      return userName;
    }
    return '';
  };

  //! Render
  return (
    <Box>
      <Formik
        validationSchema={validationSchema}
        style={{ width: '70%' }}
        initialValues={{
          interactiveDate: moment().toDate(),
          fullname: '',
          phoneNumber: '',
          link: '',
          service: '',
          branch: '',
          note: '',
          fanpageUser: displayName(),
          fractionDate: moment().toDate(),
          fanpageIDs: '',
          isHotNumber: false,
        }}
        onSubmit={(values) => handleSubmit(values)}
        innerRef={formikRef}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} style={{ width: '1000px' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Field
                  component={CustomField.DateField}
                  LabelColorPrimary
                  label={t('common:data_interactiveDate')}
                  name="interactiveDate"
                  placeholder={t('common:data_interactiveDate')}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={InputField}
                  LabelColorPrimary
                  label={t('common:data_name')}
                  name="fullname"
                  placeholder={t('common:data_name')}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  component={InputField}
                  LabelColorPrimary
                  label={t('common:data_numberPhone')}
                  name="phoneNumber"
                  placeholder={t('common:data_numberPhone')}
                />
              </Grid>
              {/*  */}
              <Grid item xs={4}>
                <Field
                  component={InputField}
                  LabelColorPrimary
                  label={t('common:data_link')}
                  name="link"
                  placeholder={t('common:data_link')}
                  required
                />
              </Grid>
              <Grid item xs={8}>
                <div className={classes.serviceAndBranch}>
                  <BranchServiceReception />
                </div>
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextAreaField}
                  LabelColorPrimary
                  minRows={4}
                  label={t('common:data_note')}
                  name="note"
                  placeholder={t('common:data_note')}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Field
                    name="fanpageUser"
                    label={t('common:data_managerPage')}
                    placeholder={displayName()}
                    LabelColorPrimary
                    component={InputField}
                    disabled
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={CheckboxField}
                    LabelColorPrimary
                    label={t('common:contacts_hotNumber')}
                    name="isHotNumber"
                  />
                </Grid>
              </Grid>
              {/*  */}
              <Grid item xs={6}>
                <Field
                  component={CustomField.DateField}
                  disabled
                  LabelColorPrimary
                  label={t('common:data_fractionDate')}
                  name="fractionDate"
                  placeholder={t('common:data_fractionDate')}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={InputField}
                  LabelColorPrimary
                  label={t('common:data_ids')}
                  name="fanpageIDs"
                  placeholder={t('common:data_ids')}
                />
              </Grid>
              <Grid container item xs={12} className={classes.btnFilter}>
                <div>
                  <CommonStyles.Button className={classes.btnCancel} onClick={toggle}>
                    {t('common:cancel')}
                  </CommonStyles.Button>
                  <CommonStyles.Button type="submit" className={classes.btnSubmit} loading={isAddingDataFanpage}>
                    {t('common:save')}
                  </CommonStyles.Button>
                </div>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ContentModal;
