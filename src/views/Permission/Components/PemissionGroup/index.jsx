import React, { useEffect, useRef } from 'react';
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
import { useGetPermissionOptions } from 'hooks/permission/useGetPermissionOptions';
import { isEmpty } from 'lodash';
import { useCallback } from 'react';
import i18n from 'i18n';
import { REQUIRED_FIELD } from 'helpers/messages';
import * as Yup from 'yup';
import { showError, showSuccess } from 'helpers/toast';
import { useChangeRoles } from 'hooks/permission/useChangeRoles';

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
    border: '1px solid red',
  },
  inputFilterinnerSelect: {
    background: theme.custom.colors.white,
    marginBottom: '28px',
  },
  btnFilter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnCancel: {
    marginRight: '12px  !important',
    padding: '6px 40px !important',
  },
  btnSubmit: {
    padding: '6px 40px  !important',
  },
}));

const PermissionGroup = ({ rowsSelected = [], setRowsSelected, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const formikRef = useRef();
  const initValueForm = {
    userRole: '',
    note: '',
  };

  const { isLoading: isChangeRole, mutateAsync: changeUserRoles } = useChangeRoles();

  //! Function
  const { data } = useGetPermissionOptions();
  const optionsUserRole = data?.data?.data;

  const onChangeRoles = async (values, resetForm) => {
    if (isEmpty(rowsSelected)) return showError(t('common:contacts_msg_error_validate'));
    try {
      const data = {
        userIds: rowsSelected.map((items) => items._id),
        userRole: values?.userRole,
        note: values?.note,
      };
      await changeUserRoles(data).then(() => {
        showSuccess(t('common:contacts_msg_success_change'));
        refetch();
      });
    } catch (error) {
      showError(t('common:contacts_msg_error_change'));
    } finally {
      resetForm();
    }
  };

  const validationSchema = Yup.object().shape({
    userRole: Yup.string().required(REQUIRED_FIELD(i18n.t('common:permission_rank_name'))),
  });

  useEffect(() => {
    if (formikRef.current && rowsSelected.length === 1) {
      formikRef.current.resetForm({
        values: {
          userRole: '',
          note: rowsSelected[0].note || '',
        },
      });
    } else {
      formikRef.current.resetForm({
        values: {
          userRole: '',
          note: '',
        },
      });
    }
  }, [rowsSelected]);

  //! Render
  return (
    <Box className={classes.PermissionGroup}>
      <Formik
        validationSchema={validationSchema}
        innerRef={formikRef}
        initialValues={initValueForm}
        onSubmit={(values, { resetForm }) => onChangeRoles(values, resetForm)}
      >
        {({ values, setFieldValue, resetForm }) => {
          return (
            <Form className={classes.inputFilter}>
              <Grid container>
                <Grid item xs={5}>
                  <Box>
                    <Field
                      className={classes.inputFilterinnerSelect}
                      LabelColorPrimary
                      name="userRole"
                      label={t('common:permission_rank_name')}
                      placeholder={t('common:permission_rank_name_placeholder')}
                      options={optionsUserRole}
                      component={SelectField}
                    />
                    <div className={classes.btnFilter}>
                      <CommonStyles.Button variant="outlined" onClick={() => resetForm()} className={classes.btnCancel}>
                        {t('common:cancel')}
                      </CommonStyles.Button>
                      <CommonStyles.Button disabled={isChangeRole} className={classes.btnSubmit} type="submit">
                        {t('common:save')}
                      </CommonStyles.Button>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                  <Field
                    className={classes.inputFilterInner}
                    name="note"
                    LabelColorPrimary
                    label={t('common:permission_note_name')}
                    placeholder={t('common:permission_note_placeholder')}
                    component={TextAreaField}
                    minRows={6}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

PermissionGroup.propTypes = propTypes;
export default PermissionGroup;
