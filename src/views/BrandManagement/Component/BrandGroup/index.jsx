import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import SelectField from 'components/CustomField/SelectField';
import CommonStyles from 'components/CommonStyles';
import InputField from 'components/CustomField/InputField';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import TextAreaField from 'components/CustomField/TextAreaField';
import { useGetListProjectOptions } from 'hooks/project/useGetProjectOptions';
import { useAddBranch } from 'hooks/branch/useAddBranchs';
import { useRef, useEffect } from 'react';
import { showError, showSuccess } from 'helpers/toast';
import { useEditBranch } from 'hooks/branch/useEditBranchs';
import { isEmpty } from 'lodash';
import * as Yup from 'yup';
import { REQUIRED_FIELD } from 'helpers/messages';
import i18n from 'i18n';
import DeleteBranchAction from '../Action/DeleteBranchAction';
import { useDeleteBranch } from 'hooks/branch/useDeleteBranch';
import useToggleDialog from 'hooks/useToggleDialog';
import { useCallback } from 'react';
import { checkHeadNumber } from 'helpers/validation';

const propTypes = {};

const useStyles = makeStyles((theme) => ({
  PermissionGroup: {
    background: '#F1F2F4',
    padding: '26px 16px',
    borderRadius: '8px',
  },
  inputFilter: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  inputFilterInner: {
    '& > div': {
      background: theme.custom.colors.white,
    },
  },
  inputFilterinnerSelect: {
    background: theme.custom.colors.white,
  },
  btnFilter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px !important',
  },
  btnCancel: {
    marginRight: '12px  !important',
    padding: '6px 40px !important',
  },
  btnSubmit: {
    padding: '7px 40px  !important',
  },
  labelHead: {
    display: 'flex',
    alignItems: 'center',
    color: `${theme.custom.colors.green} !important`,
    fontWeight: 600,
  },
}));

const BrandGroup = ({ rowsSelected, handleSelectAll, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const formikRef = useRef();
  const { data: resProjectList, isLoading: isLoadingProjectList } = useGetListProjectOptions();
  const { isLoading: isAddingBranch, mutateAsync: addBranch } = useAddBranch();
  const { isLoading: isEditingBranch, mutateAsync: editBranch } = useEditBranch();
  const { isLoading: isDeletingBranch, mutateAsync: deleteBranch } = useDeleteBranch();
  const { open: openDelete, toggle: toggleDelete, shouldRender: shouldRenderDelete } = useToggleDialog();

  const projectList = resProjectList?.data?.data || [];

  const formatOptionsProjectList = projectList.filter((el) => el !== null);

  const isEdit =
    rowsSelected.filter((el) => {
      if (el && !isEmpty(el)) {
        return el;
      }
    }).length > 0;

  //! Function

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await editBranch({
          data: {
            code: values.code,
            name: values.name,
            project: values.project,
            phoneNumber: values.phoneNumber,
            email: values.email,
            address: values.address,
          },
          id: values.id,
        });
        handleSelectAll([]);
        showSuccess(t('common:branch_editSuccess'));
      } else {
        await addBranch(values);
        showSuccess(t('common:branch_addSuccess'));
      }
      await refetch();
    } catch (error) {
      showError(error?.response?.data.messages[0]);
    }
    refetch();

    formikRef?.current.resetForm({
      values: {
        project: '',
        code: '',
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
      },
    });
  };

  useEffect(() => {
    if (formikRef.current && rowsSelected.length === 1) {
      const { code, name, project, phoneNumber, email, address, id, ...rest } = rowsSelected[0];
      formikRef?.current.resetForm({
        values: {
          project: project || '',
          code: code || '',
          name: name || '',
          phoneNumber: phoneNumber || '',
          email: email || '',
          address: address || '',
          id: id || '',
        },
      });
    }
    if (rowsSelected.length === 0) {
      formikRef?.current.resetForm({
        values: {
          project: '',
          code: '',
          name: '',
          phoneNumber: '',
          email: '',
          address: '',
        },
      });
    }
  }, [rowsSelected]);

  const validationSchema = Yup.object().shape({
    project: Yup.string().required(REQUIRED_FIELD(i18n.t('common:project'))),
    code: Yup.string().required(REQUIRED_FIELD(i18n.t('common:brand_id'))),
    name: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:brand_name')))
      .max(50, 'Tên không được quá 50 ký tự!'),
    phoneNumber: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:brand_numberPhone')))
      .test('startNumber', `${t('common:userlist_phoneNumberStart')}`, async (val) => checkHeadNumber(val)),
    email: Yup.string().required(REQUIRED_FIELD(i18n.t('common:brand_email'))),
    address: Yup.string().required(REQUIRED_FIELD(i18n.t('common:brand_address'))),
  });

  //! Render
  return (
    <Box className={classes.PermissionGroup}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          project: '',
          code: '',
          name: '',
          phoneNumber: '',
          email: '',
          address: '',
        }}
        onSubmit={(values) => handleSubmit(values)}
        innerRef={formikRef}
      >
        {(formik) => (
          <form className={classes.inputFilter} onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid container item xs={12}>
                <Grid item md={5} sm={12}>
                  <Box>
                    <Grid container item xs={12}>
                      <Grid item xs={3} className={classes.labelHead}>
                        {t('common:project')}
                      </Grid>
                      <Grid item xs={9}>
                        <Field
                          className={classes.inputFilterinnerSelect}
                          name="project"
                          // label={t('common:project')}
                          options={formatOptionsProjectList}
                          component={SelectField}
                        />
                      </Grid>
                    </Grid>

                    <Grid container className="m-t-15" item xs={12}>
                      <Grid item xs={3} className={classes.labelHead}>
                        {t('common:brand_id')}
                      </Grid>
                      <Grid item xs={9}>
                        <Field
                          name="code"
                          // label={t('common:brand_name')}
                          component={InputField}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item md={5} sm={12}>
                  <Box>
                    <Grid container item xs={12}>
                      <Grid item xs={3} className={classes.labelHead}>
                        {t('common:brand_numberPhone')}
                      </Grid>
                      <Grid item xs={9}>
                        <Field
                          name="phoneNumber"
                          // label={t('common:brand_numberPhone')}
                          component={InputField}
                        />
                      </Grid>
                    </Grid>

                    <Grid container className="m-t-15" item xs={12}>
                      <Grid item xs={3} className={classes.labelHead}>
                        {t('common:brand_email')}
                      </Grid>
                      <Grid item xs={9}>
                        <Field
                          name="email"
                          // label={t('common:brand_email')}
                          component={InputField}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              <Grid container className="m-t-15" item xs={12}>
                <Grid item md={5} sm={12}>
                  <Box>
                    <Grid container item xs={12}>
                      <Grid item xs={3} className={classes.labelHead}>
                        {t('common:brand_name')}
                      </Grid>
                      <Grid item xs={9}>
                        <Field
                          name="name"
                          // label={t('common:brand_email')}
                          component={InputField}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item md={5} sm={12}>
                  <Box>
                    <Grid container item xs={12}>
                      <Grid item xs={3} className={classes.labelHead}>
                        {t('common:brand_address')}
                      </Grid>
                      <Grid item xs={9}>
                        <Field
                          name="address"
                          // label={t('common:brand_email')}
                          component={InputField}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              <Grid container item xs={12} className={classes.btnFilter}>
                <DeleteBranchAction
                  className={classes.btnCancel}
                  idBranch={formik.values.id}
                  disabled={!isEdit}
                  handleSelectAll={handleSelectAll}
                  refetch={refetch}
                />
                <CommonStyles.Button
                  variant="outlined"
                  type="reset"
                  disabled={isEdit}
                  onClick={() =>
                    formik.resetForm({
                      values: {
                        project: '',
                        name: '',
                        phoneNumber: '',
                        email: '',
                        address: '',
                      },
                    })
                  }
                  className={classes.btnCancel}
                  loading={isAddingBranch}
                >
                  {t('common:cancel')}
                </CommonStyles.Button>
                <CommonStyles.Button type="submit" className={classes.btnSubmit} loading={isAddingBranch}>
                  {isEdit ? t('common:edit_project') : t('common:add-new')}
                </CommonStyles.Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

BrandGroup.propTypes = propTypes;
export default BrandGroup;
