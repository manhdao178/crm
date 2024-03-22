import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik, useFormikContext } from 'formik';
import CommonStyles from 'components/CommonStyles';
import InputField from 'components/CustomField/InputField';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import TextAreaField from 'components/CustomField/TextAreaField';
import DeleteAction from '../Action/DeleteAction';
import { cloneDeep, isArray, isEmpty, values } from 'lodash';
import * as Yup from 'yup';
import { useEditService } from 'hooks/service/useEditService';
import { showError, showSuccess } from 'helpers/toast';
import BranchField from './BranchField';
import CustomField from 'components/CustomField';

const propTypes = {};

const useStyles = makeStyles((theme) => ({
  PermissionGroup: {
    background: '#F1F2F4',
    padding: '26px 16px',
    borderRadius: '8px',
    '& .input-group': {
      alignItems: 'center',
    },
    '& .vnd': {
      marginLeft: 10,
    },
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
    gap: 12,
    marginTop: '15px !important',
    '& .btnDelete': {
      // backgroundColor: 'red !important',
    },
    '& .btn': {
      padding: '6px  !important',
      minWidth: '106px',
    },
  },

  labelHead: {
    color: `${theme.custom.colors.green} !important`,
    fontWeight: 600,
  },
}));

const CreateAndUpdateService = ({ rowsSelected, handleAddService, handleSelectAll, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const { isLoading: editingService, mutateAsync: editService } = useEditService();

  const initValuesForm = { branches: [], code: '', name: '', funnel: '', note: '', allBranch: false };
  const formikRef = useRef();

  const isEdit =
    rowsSelected.filter((el) => {
      if (el && !isEmpty(el)) {
        return el;
      }
    }).length > 0;

  const validationSchema = Yup.object().shape({
    branches: Yup.string().when('allBranch', {
      is: false,
      then: Yup.string().required(t('common:is_required_field', { key: t('common:branch') })),
      otherwise: Yup.string(),
    }),
    code: Yup.string().required(t('common:is_required_field', { key: t('common:data_service_code') })),
    name: Yup.string().required(t('common:is_required_field', { key: t('common:data_service_name') })),
    funnel: Yup.string().required(t('common:is_required_field', { key: t('common:serivce_funnel') })),
  });

  //! Function

  const handleEditService = async (values, { resetForm }) => {
    const branchs = values.branches[0].value;
    const branchsConvert = isArray(branchs) ? branchs : values.branches.map((item) => item.value);
    const valueConvert = { ...values, branches: branchsConvert };
    try {
      const res = await editService({ id: valueConvert.id, data: valueConvert });
      await refetch();
      showSuccess(t('common:service_editSuccess'));
      // resetForm();
    } catch (error) {
      showError(t('common:service_editError'));
    }
  };

  useEffect(() => {
    if (formikRef.current && rowsSelected.length === 1) {
      const { id, branches, code, name, funnel, note, branchDetails, allBranch, ...rest } = rowsSelected[0];
      formikRef.current.resetForm({
        values: {
          branches: branchDetails?.map((item) => ({ label: item.name, value: item.id })) || [],
          code: code || '',
          name: name || '',
          funnel: funnel || '',
          note: note || '',
          id: id || '',
          allBranch: allBranch || false,
        },
      });
    }
    // if (rowsSelected.length > 1) {
    //   formikRef.current.resetForm({ values: initValuesForm });
    // }
  }, [rowsSelected]);

  //! Render
  return (
    <Box className={classes.PermissionGroup}>
      <Formik
        initialValues={initValuesForm}
        innerRef={formikRef}
        validationSchema={validationSchema}
        onSubmit={isEdit ? handleEditService : handleAddService}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className={classes.inputFilter}>
              <Grid container>
                <Grid container item xs={12}>
                  <Grid item md={5} sm={12}>
                    <Box>
                      <Grid container className="input-group" item xs={12}>
                        <Grid item xs={3} className={classes.labelHead}>
                          {t('common:data_service_code')}
                        </Grid>
                        <Grid item xs={9}>
                          <Field name="code" component={InputField} />
                        </Grid>
                      </Grid>

                      <Grid container className="m-t-15 input-group" item xs={12}>
                        <Grid item xs={3} className={classes.labelHead}>
                          {t('common:data_service_name')}
                        </Grid>
                        <Grid item xs={9}>
                          <Field name="name" component={InputField} />
                        </Grid>
                      </Grid>
                      <Grid container className="m-t-15 input-group" item xs={12}>
                        <Grid item xs={3} className={classes.labelHead}>
                          {t('common:serivce_funnel')}
                        </Grid>
                        <Grid item xs={7.5}>
                          <Field name="funnel" type="number" component={InputField} />
                        </Grid>
                        <Grid item xs={1.5}>
                          <div className="vnd">VND</div>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item md={5} sm={12}>
                    <Box>
                      <Grid container item xs={12}>
                        <Grid item xs={3} className={classes.labelHead}>
                          {t('common:data_note')}
                        </Grid>
                        <Grid item xs={9}>
                          <Field
                            name="note"
                            placeholder={t('common:permission_note_placeholder')}
                            component={TextAreaField}
                            minRows={5.5}
                          />
                        </Grid>
                      </Grid>
                      <Grid container className="m-t-15 input-group" item xs={12}>
                        <Grid item xs={3} className={classes.labelHead}>
                          {t('common:branch')}
                        </Grid>
                        <Grid item xs={9}>
                          <BranchField />
                        </Grid>
                        <Field
                          style={{ marginTop: '10px' }}
                          LabelColorPrimary
                          component={CustomField.CheckboxField}
                          label={t('common:allBranch')}
                          name="allBranch"
                        />
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container item xs={12} className={classes.btnFilter}>
                  <DeleteAction
                    className="btn btnDelete"
                    idService={values.id}
                    refetch={refetch}
                    disabled={!isEdit}
                    handleSelectAll={handleSelectAll}
                  />
                  <CommonStyles.Button type="reset" className="btn" variant="outlined" disabled={isEdit}>
                    {t('common:cancel')}
                  </CommonStyles.Button>
                  <CommonStyles.Button type="submit" className="btn">
                    {!isEdit ? t('common:add-new') : t('common:edit_project')}
                  </CommonStyles.Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

CreateAndUpdateService.propTypes = propTypes;
export default CreateAndUpdateService;
