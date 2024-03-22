import { Grid, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CommonIcons from 'components/CommonIcons';
import StyledButton from 'components/CommonStyles/Button';
import CustomField from 'components/CustomField';
import HeaderLayoutContent from 'components/HeaderLayoutContent';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import LogoMedicGroup from './commons/Logo';
import Background from '../../assets/images/background.svg';
import BigCalendar from 'components/BigCalendar';
import { useGetReceptions } from 'hooks/receptions/useGetReceptions';
import { useAddAppointment } from 'hooks/appointment/useAddApointment';
import { useRef } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import TableAppointment from './components/TableAppointment';
import { useGetProjectDetail } from 'hooks/project/useGetProjectDetail';
import { BASE_IMAGE } from 'constants/api';
import { checkHeadNumber } from 'helpers/validation';
import { showError, showSuccess } from 'helpers/toast';
import { useLocation, useNavigate } from 'react-router-dom';
import httpServices from 'services/httpServices';
import eventEmitter from 'helpers/eventEmitter';
import ServiceBranch from 'components/ServiceBranch';
import SimpleBarReact from 'simplebar-react';
import BranchServiceReception from './components/BranchServiceReception';
import logoDev from 'assets/logos/logodev.png';

const useStyles = makeStyles((theme) => {
  return {
    layoutReceptionist: {
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'space-between',
      padding: '20px 40px 50px 40px',
      backgroundColor: '#F5FBFF',
      top: 0,
      width: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${Background})`,
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
      backgroundAttachment: 'fixed',
    },
    fieldBox: {
      display: 'grid',
      gap: '24px',
      marginBottom: '30px',
    },
    headerFormReceptionist: {
      marginBottom: '30px',
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '26px',
      color: theme.custom.colors.green,
    },
    layoutReceptionistLeft: {
      padding: '36px 40px',
      background: '#fff',
      borderRadius: 8,
    },
    layoutReceptionistLeftHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // marginBottom: '45px',
    },
    layoutReceptionistLeftHeaderTitle: {
      fontFamily: 'Arial Narrow',
      fontWeight: 600,
      fontSize: '40px',
      lineHeight: '70px',
      display: 'flex',
      alignItems: 'center',
      color: '#008638',
      marginLeft: '25px',
    },
    HeaderContent: {
      height: '100%',
      borderBottom: '1px solid #ddd',
    },
    boxImageLogo: {
      width: '150px',
      '& .topDrawer_logo': {
        height: '150px',
        width: '150px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    imageLogo: {
      width: '100%',
      height: '100%',
    },
    table: {
      padding: 24,
      background: '#fff',
      borderRadius: 8,
    },
  };
});

const LayoutReceptionist = (props) => {
  //! State
  const { children } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();

  const { isLoading: isAddingAppointment, mutateAsync: addAppointment } = useAddAppointment();
  const formikRef = useRef();

  const classes = useStyles();
  const { t } = useTranslation();
  const isShowTable = !!location?.search.replace('?', '') || !!searchText;
  const [date, setDate] = useState(location?.search.replace('?', '') || null);
  const user = httpServices.getUserInfoStorage();

  //options
  const options = [
    {
      value: '1',
      label: `${t('common:female')}`,
    },
    {
      value: '0',
      label: `${t('common:male')}`,
    },
  ];

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .max(50, t('common:userlist_fullNameLength'))
      .required(t('common:is_required_field', { key: t('common:userlist_fullName') })),
    phoneNumber: Yup.string()
      .required(t('common:is_required_field', { key: t('common:userlist_phone') }))
      .test('startNumber', `${t('common:userlist_phoneNumberStart')}`, async (val) => checkHeadNumber(val))
      .length(10, t('common:userlist_phoneNumberStart')),
    branch: Yup.string()
      .required(t('common:is_required_field', { key: t('common:branch') }))
      .nullable(true),
    service: Yup.string()
      .required(t('common:is_required_field', { key: t('common:contacts_bookingForCustomerSeriveType') }))
      .nullable(true),
    date: Yup.string()
      .required(t('common:is_required_field', { key: t('common:contacts_bookingForCustomerDate') }))
      .nullable(true),
  });
  const logoId = httpServices.getServiceStorage();
  const { data: dataProject, isLoading, error, refetch } = useGetProjectDetail(logoId);
  const logoProject = dataProject ? BASE_IMAGE + dataProject?.data?.data?.logo : '';

  //! Function

  const handleDateInCalendar = (date) => {
    setDate(date);
  };

  const handleSubmit = async (values) => {
    const valuesConvert = { ...values, branch: values.branch.value, service: values.service.value };
    try {
      await addAppointment(valuesConvert);
      showSuccess(t('common:appointment_addSuccess'));

      eventEmitter.emit('refetchCalendar');
    } catch (error) {
      showError(t('common:appointment_addError'));
    }
    formikRef?.current.resetForm({
      values: {
        fullname: '',
        phoneNumber: '',
        branch: '',
        service: '',
        gender: '1',
        date: null,
        note: '',
      },
    });
  };

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
  };

  const handleBack = () => {
    navigate('/receptionist');
    setSearchText();
    setDate();
  };

  //! Render
  return (
    <SimpleBarReact style={{ maxHeight: 'calc(100vh - 0px)' }}>
      <div className={classes.layoutReceptionist}>
        <Grid container spacing={4}>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <div className={classes.layoutReceptionistLeftHeader}>
                {/* {logoId ? (
                  <div className={classes.boxImageLogo}>
                    <img src={`${logoProject}`} className={classes.imageLogo} alt="default-avatar" />
                  </div>
                ) : (
                  <LogoMedicGroup />
                )} */}
                <div className={classes.boxImageLogo}>
                  <div style={{ backgroundImage: `url(${logoDev})` }} className="topDrawer_logo"></div>
                </div>

                <div className={classes.layoutReceptionistLeftHeaderTitle}>CRM</div>
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className={classes.HeaderContent}>
                <HeaderLayoutContent
                  sx={{ height: '100%' }}
                  sxHeader={{ fontSize: '16px', color: '#708090' }}
                  header={`${t('common:hello')}, `}
                  headerNameUser={user?.fullname}
                />
                <div className={classes.horizontalLine}></div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={4} item xs={12}>
            <Grid item xs={3.8}>
              <div className={classes.layoutReceptionistLeft}>
                <Formik
                  initialValues={{
                    fullname: '',
                    phoneNumber: '',
                    branch: '',
                    // service: '',
                    gender: '1',
                    date: null,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                  }}
                  innerRef={formikRef}
                >
                  {(formik) => {
                    return (
                      <form onSubmit={formik.handleSubmit}>
                        <div className={classes.headerFormReceptionist}>{t('common:contacts_bookingForCustomer')}</div>
                        <div>
                          <Box className={classes.fieldBox}>
                            <Field
                              label={t('common:contacts_bookingForCustomerName')}
                              name="fullname"
                              LabelColorPrimary
                              component={CustomField.InputField}
                            />

                            <Field
                              label={t('common:contacts_bookingForCustomerGender')}
                              name="gender"
                              options={options}
                              LabelColorPrimary
                              component={CustomField.RadioField}
                            />

                            <Field
                              label={t('common:contacts_bookingForCustomerNumberPhone')}
                              LabelColorPrimary
                              name="phoneNumber"
                              component={CustomField.InputField}
                            />

                            {/* <ServiceBranch /> */}
                            <BranchServiceReception
                              label={{ branch: `${t('common:data_branch')}`, service: `${t('common:data_service')}` }}
                            />

                            <Field
                              label={t('common:contacts_bookingForCustomerDate')}
                              LabelColorPrimary
                              name="date"
                              component={CustomField.DatePickerField}
                              minutesStep={30}
                            />
                            <Field
                              component={CustomField.TextAreaField}
                              minRows={4}
                              LabelColorPrimary
                              label="Ghi chú"
                              name="note"
                              placeholder="Ghi chú"
                            />
                          </Box>
                        </div>

                        <div className={classes.footerPopupAddUser}>
                          <StyledButton type="submit" style={{ width: '100%' }} loading={isAddingAppointment}>
                            {t('common:add-new')}
                          </StyledButton>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </Grid>
            <Grid item xs={8.2}>
              <div className={classes.layoutReceptionistRight}>
                <Formik
                  initialValues={{ searchValue: '' }}
                  onSubmit={(values) => {
                    handleSearch(values.searchValue);
                  }}
                >
                  <Form>
                    <Field
                      component={CustomField.InputField}
                      name="searchValue"
                      placeholder={t('common:search')}
                      sx={{ borderRadius: '16px', width: '100%', marginBottom: '16px' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <span
                              style={{
                                borderRight: '1px solid #E2E6E9',
                                paddingRight: '1rem',
                                color: '#434D56',
                                fontWeight: '600',
                              }}
                            >
                              {t('common:ads_schedule')}
                            </span>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <CommonIcons.Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form>
                </Formik>
                <div className={classes.table}>
                  {isShowTable ? (
                    <TableAppointment date={date} handleBack={handleBack} searchText={searchText} />
                  ) : (
                    <BigCalendar handleDateInCalendar={handleDateInCalendar} />
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </SimpleBarReact>
  );
};

export default LayoutReceptionist;
