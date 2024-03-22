import React, { Fragment } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomField from 'components/CustomField';
import { REQUIRED_FIELD } from 'helpers/messages';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';
import { useRef } from 'react';
import { useGetUserRoleOptions } from 'hooks/userRole/useGetUserRoleOptions';
import { isEmpty } from 'lodash';
import { showError, showSuccess } from 'helpers/toast';
import { useGetUserDetail } from 'hooks/users/useGetUserDetail';
import ArrayProjects from '../Components/ArrayProjects';
import { useGetListProjectOptions } from 'hooks/project/useGetProjectOptions';
import ArrayProjectBranches from '../Components/ArrayProjectBranches';
import User from 'models/user.model';
import { useAddUsers } from 'hooks/users/useAddUser';
import { useEditUser } from 'hooks/users/useEditUser';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';
import { checkHeadNumber, checkProjectHasBranches } from 'helpers/validation';
import { useResetPassword } from 'hooks/users/useResetPassword';
import { useGetUserTitleOption } from 'hooks/users/userGetUserTitleOption';

const options = [
  {
    value: '1',
    label: 'Nữ',
  },
  {
    value: '0',
    label: 'Nam',
  },
];

const useStyles = makeStyles((theme) => {
  return {
    headerPopupAddUser: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 36,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: theme.custom.colors.white,
      '& .label-add-user': {
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: '24px',
        paddingBottom: '15px',
        borderBottom: '2px solid #ddd',
        color: theme.custom.colors.green,
      },
      '& .icon-close-header-add-user': {
        height: '0%',
        padding: '15px',
        backgroundColor: '#F1F2F4',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        '&:active': {
          borderRadius: '12px',
          backgroundColor: '#ccc',
        },
      },
    },
    footerPopupAddUser: {
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '20px',
    },
    fieldBox: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '100%',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      gap: '40px',
      marginBottom: '30px',
    },
    fieldNote: {
      marginBottom: '30px',
    },
    loading: {
      width: '24.5px !important',
      height: '24.5px !important',
    },
    tab: {
      border: '1px solid #C6CCD3 !important',
      borderTopLeftRadius: '8px !important',
      borderTopRightRadius: '8px !important',
      color: '#434D56 !important',
      opacity: '1 !important',
    },
    tabActive: {
      borderTopLeftRadius: '8px !important',
      borderTopRightRadius: '8px !important',
      color: '#ffffff !important',
      opacity: '1 !important',
      backgroundColor: '#6BB8F4 !important',
    },
  };
});

const DialogAddUser = ({ open, toggle, user, refetch }) => {
  //! State
  const classes = useStyles();
  const formikRef = useRef();
  const isEdit = !isEmpty(user);
  const queryClient = useQueryClient();
  const { data: userRoleList, isLoading: isLoadingRoleList } = useGetUserRoleOptions();
  const { data: resUserTitle } = useGetUserTitleOption();
  const { data: resProjectList, isLoading: isLoadingProjectList } = useGetListProjectOptions();
  const { isLoading: addingUser, mutateAsync: addUser } = useAddUsers();
  const { isLoading: editingUser, mutateAsync: editUser } = useEditUser();
  const { isLoading: resetingPassword, mutateAsync: resetPassword } = useResetPassword();

  const {
    data: resUserDetail,
    isLoading: isLoadingUserDetail,
    refetch: refetchUser,
  } = useGetUserDetail(user?._id, { enabled: !!user?._id });

  const userRoleOptions = userRoleList?.data?.data || [];
  const projectList = resProjectList?.data?.data || [];
  const userDetail = resUserDetail?.data?.data || {};
  const userTitleOption = resUserTitle?.data?.data || [];

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    staffCode: Yup.string().required(t('common:is_required_field', { key: t('common:userlist_staffCode') })),
    fullname: Yup.string()
      .max(20, t('common:userlist_fullNameLength'))
      .required(t('common:is_required_field', { key: t('common:userlist_fullName') })),
    phoneNumber: Yup.string()
      .required(t('common:is_required_field', { key: t('common:userlist_phone') }))
      .test('startNumber', `${t('common:userlist_phoneNumberStart')}`, async (val) => checkHeadNumber(val))
      .min(10, t('common:userlist_phoneNumberLength')),
    userTitle: Yup.string().required(t('common:is_required_field', { key: t('common:userlist_jobTitle') })),
    email: Yup.string()
      .email(t('common:userlist_emailFormat'))
      .required(t('common:is_required_field', { key: t('common:userlist_email') })),
    projects: Yup.string().required(t('common:is_required_field', { key: t('common:userlist_email') })),
  });

  //! Function

  const handleSubmit = async (values) => {
    const projectHasNoBranches = checkProjectHasBranches(values?.projects);

    const body = User.parseBodyToRequest(values, isEdit);
    if (projectHasNoBranches || isEmpty(body?.projects)) {
      showError(`Vui lòng chọn chi nhánh cho dự án đã chọn`);
      return;
    }
    const updateUser = isEdit ? editUser : addUser;
    try {
      await updateUser(body);

      if (isEdit) {
        await refetchUser();
        showSuccess(t('common:userlist_editSuccess'));
      } else {
        await queryClient.refetchQueries([queryKeys.users]);
        showSuccess(t('common:userlist_addSuccess'));
        toggle();
      }
      refetch();
    } catch (error) {
      showError(error?.response.data.messages[0] || t('common:userlist_errors'));
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(user?._id);
      showSuccess(t('common:userlist_resetPasswordSuccess'));
    } catch (error) {
      showError(error?.response.data.messages[0] || t('common:userlist_errors'));
    }
  };
  const ContentPopupAddUser = () => {
    return (
      <Formik
        initialValues={User.parseInitialForm(userDetail, projectList)}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={(values, helpersFormik) => handleSubmit(values, { ...helpersFormik, toggle })}
        innerRef={formikRef}
        enableReinitialize
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              {isLoadingUserDetail ? (
                <CircularProgress />
              ) : (
                <Fragment>
                  <div className={classes.headerPopupAddUser}>
                    <div className="label-add-user">
                      {user ? t('common:dialogAddUser_Edit') : t('common:dialogAddUser_Add')}
                    </div>
                    <div className="icon-close-header-add-user" onClick={toggle}>
                      <CommonIcons.Close sx={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <div>
                    <Box className={classes.fieldBox}>
                      <Field
                        label={t('common:userlist_staffCode')}
                        placeholder={t('common:userlist_field', { key: t('common:userlist_staffCode') })}
                        LabelColorPrimary
                        name="staffCode"
                        component={CustomField.InputField}
                      />

                      <Field
                        label={t('common:userlist_fullName')}
                        placeholder={t('common:userlist_field', { key: t('common:userlist_fullName') })}
                        name="fullname"
                        LabelColorPrimary
                        component={CustomField.InputField}
                      />

                      <Field
                        label={t('common:userlist_phone')}
                        placeholder={t('common:userlist_field', { key: t('common:userlist_phone') })}
                        LabelColorPrimary
                        name="phoneNumber"
                        component={CustomField.InputField}
                      />

                      <Field
                        label={t('common:userlist_email')}
                        placeholder={t('common:userlist_field', { key: t('common:userlist_email') })}
                        LabelColorPrimary
                        name="email"
                        component={CustomField.InputField}
                      />

                      <Field
                        name="userRole"
                        LabelColorPrimary
                        placeholder={t('common:userlist_select', { key: t('common:userlist_jobRole') })}
                        label={t('common:userlist_jobRole')}
                        options={userRoleOptions}
                        component={CustomField.SelectField}
                      />

                      <Field
                        name="userTitle"
                        LabelColorPrimary
                        placeholder={t('common:userlist_field', { key: t('common:userlist_jobTitle') })}
                        label={t('common:userlist_jobTitle')}
                        options={userTitleOption}
                        component={CustomField.SelectField}
                      />
                      <Field
                        label={t('common:userlist_gender')}
                        name="gender"
                        placeholder={t('common:userlist_field', { key: t('common:userlist_gender') })}
                        options={options}
                        LabelColorPrimary
                        positionLabel="up"
                        component={CustomField.RadioField}
                      />
                      <Field
                        label={t('common:userlist_dateOfBirth')}
                        name="dob"
                        LabelColorPrimary
                        component={CustomField.DateField}
                      />
                    </Box>
                    <Box className={classes.fieldNote}>
                      <Field
                        component={CustomField.TextAreaField}
                        LabelColorPrimary
                        minRows={4}
                        label={t('common:userlist_note')}
                        name="note"
                        placeholder={t('common:userlist_note')}
                      />
                    </Box>
                    <Box>
                      <ArrayProjects />
                    </Box>

                    <ArrayProjectBranches />

                    <Box sx={{ width: 'calc(50% - 20px)' }}></Box>
                  </div>

                  <div className={classes.footerPopupAddUser}>
                    {isEdit ? (
                      <CommonStyles.Button
                        type="button"
                        style={{ width: 160 }}
                        // disabled={isLoading}
                        loading={editingUser || addingUser}
                        onClick={handleResetPassword}
                        variant="outlined"
                      >
                        {t('common:rePassword')}
                      </CommonStyles.Button>
                    ) : null}
                    <CommonStyles.Button type="submit" style={{ width: 160 }} loading={editingUser || addingUser}>
                      {t('common:save')}
                    </CommonStyles.Button>
                  </div>
                </Fragment>
              )}
            </form>
          );
        }}
      </Formik>
    );
  };

  //! Render

  return <CommonStyles.Modal open={open} toggle={toggle} disableClickOutside content={ContentPopupAddUser()} />;
};
export default DialogAddUser;
