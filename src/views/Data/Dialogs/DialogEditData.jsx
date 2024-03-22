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
import i18n from 'i18n';
import TextAreaField from 'components/CustomField/TextAreaField';
import { useRef } from 'react';
import moment from 'moment';
import { showError, showSuccess } from 'helpers/toast';
import CustomField from 'components/CustomField';
import ServiceBranch from 'components/ServiceBranch';
import { Fragment } from 'react';
import httpServices from 'services/httpServices';
import { roles } from 'constants';
import { useEditDataFanpage } from 'hooks/leads/useEditDataFanpage';
import BranchServiceReception from 'components/LayoutReceptionist/components/BranchServiceReception';
import { useGetBranchOptions } from 'hooks/branch/useGetBranchOptions';
import { useGetReceptions } from 'hooks/receptions/useGetReceptions';
import CheckboxField from 'components/CustomField/CheckboxField';

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

const DialogEditData = ({ open, toggle, onSubmit, item, isLoading, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const formikRef = useRef();
  const user = httpServices.getUserInfoStorage();
  const userName = user?.fullname;
  const userID = user?.id;
  const userRole = user?.userRoleDetail?.key;
  const { isLoading: isEditingData, mutateAsync: editData } = useEditDataFanpage();

  const project = httpServices.getServiceStorage();
  const { data: resBranchOption } = useGetBranchOptions({ project: project });
  const branchOption = resBranchOption?.data?.data || [];
  const { data: resServiceOption } = useGetReceptions({ project: project });
  const serviceOption = resServiceOption?.data?.data || [];

  const initBranch = branchOption?.filter((ele) => item?.branch === ele.value)[0];
  const initService = serviceOption?.filter((ele) => item?.service === ele.value)[0];

  const displayName = () => {
    if (userRole === roles.FANPAGE || userRole === roles.PAGE_LEAD) {
      return userName;
    }
    return '';
  };

  const initValuesForm = !!item
    ? {
        interactiveDate: item.interactiveDate,
        phoneNumber: item.phoneNumber,
        fullname: item.fullname,
        link: item.link,
        service: initService,
        branch: initBranch,
        note: item.note,
        fanpageUser: displayName(),
        fractionDate: item.fractionDate,
        fanpageIDs: item.fanpageIDs,
        id: item.id,
        isHotNumber: item.isHotNumber,
      }
    : {
        interactiveDate: '',
        fullname: '',
        phoneNumber: '',
        link: '',
        service: '',
        branch: '',
        note: '',
        fanpageUser: displayName(),
        fractionDate: moment().toDate(),
        fanpageIDs: '',
        id: '',
        isHotNumber: false,
      };
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

  //! Function

  const handleSubmit = async (values) => {
    try {
      await editData({
        data: {
          interactiveDate: values?.interactiveDate,
          phoneNumber: values?.phoneNumber,
          fullname: values?.fullname,
          link: values?.link,
          service: values?.service?.value,
          branch: values?.branch?.value,
          note: values?.note,
          fractionDate: values?.fractionDate,
          fanpageIDs: values?.fanpageIDs,
          id: values?.id,
          fanpageUser: userID,
          isHotNumber: values?.isHotNumber,
        },
        id: item?.id,
      });
      showSuccess(t('common:data_editSuccess'));
      refetch();
      toggle();
    } catch (error) {
      showError(error?.response.data.messages[0]);
    }
    refetch();
  };

  const ContentDialog = () => {
    return (
      <Fragment>
        <Formik
          validationSchema={validationSchema}
          style={{ width: '70%' }}
          initialValues={initValuesForm}
          onSubmit={(values) => handleSubmit(values)}
          innerRef={formikRef}
          enableReinitialize
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
                    disabled
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
                    disabled
                  />
                </Grid>
                <Grid item xs={8}>
                  <div className={classes.serviceAndBranch}>
                    <BranchServiceReception disabledBranch />
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
                    <CommonStyles.Button loading={isEditingData} type="submit" className={classes.btnSubmit}>
                      {t('common:save')}
                    </CommonStyles.Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Fragment>
    );
  };

  //!Render
  return <CommonStyles.Modal open={open} toggle={toggle} content={ContentDialog()} />;
};

export default DialogEditData;
