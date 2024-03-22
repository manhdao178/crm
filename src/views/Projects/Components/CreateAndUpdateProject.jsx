import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import InputField from 'components/CustomField/InputField';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { encodeImageFileAsURL } from 'helpers';
import DeleteAction from '../Action/DeleteAction';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import { useEditProject } from 'hooks/projects/useEditProject';
import { useAddProject } from 'hooks/projects/useAddProject';
import { useUploadLogo } from 'hooks/projects/useUploadLogo';
import { showInfo } from 'helpers/toast';
import { BASE_IMAGE } from 'constants/api';

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
    '& .errMsg': {
      color: 'red',
      fontSize: '0.75rem',
    },
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
  logo: {
    '& > img': {
      with: 100,
      height: 100,
      objectFit: 'cover',
    },
  },
}));

const CreateAndUpdateProject = ({ rowsSelected, handleDeleteProject, handleSelectAll, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const initValuesForm = { name: '', logo: '' };
  const formikRef = useRef();
  // const [fileSelected, setFileSelected] = useState(null);

  const { isLoading: isLoadingUpload, mutateAsync: uploadLogo } = useUploadLogo();

  const { isLoading: isEditingProject, mutateAsync: editProject } = useEditProject();

  const { isLoading: isAddingProject, mutateAsync: addProject } = useAddProject();

  const isEdit =
    rowsSelected.filter((el) => {
      if (el && !isEmpty(el)) {
        return el;
      }
    }).length > 0;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên thương hiệu là trường bắt buộc'),
    logo: Yup.string().required('Ảnh là trường bắt buộc'),
  });

  //! Function

  const handleEditAndAddProject = async (value) => {
    let logoUrl;

    if (value.logoSelected) {
      const formData = new FormData();
      formData.append('file', value.logoSelected);
      try {
        const resLogo = await uploadLogo(formData);
        logoUrl = resLogo?.data?.data.uri;
      } catch (error) {
        showError(t('common:project_addError'));
      }
    }

    try {
      isEdit
        ? await editProject({
            data: { name: value.name, logo: value.logoSelected ? logoUrl : value.logo },
            id: value.id,
          })
        : await addProject({ name: value.name, logo: logoUrl });
      showInfo(t('common:project_editSuccess'));
      await refetch();
    } catch (error) {
      showError(t('common:project_addError'));
    }
  };

  useEffect(() => {
    if (formikRef.current && rowsSelected.length === 1) {
      const { name, logo, id, ...rest } = rowsSelected[0];
      formikRef.current.resetForm({ values: { name: name || '', logo: logo || '', id: id || '' } });
    }
    if (rowsSelected.length === 0) {
      formikRef.current.resetForm({ values: { name: '', logo: '' } });
    }
  }, [rowsSelected]);

  //! Render
  return (
    <Box className={classes.PermissionGroup}>
      <Formik
        initialValues={initValuesForm}
        validationSchema={validationSchema}
        innerRef={formikRef}
        onSubmit={(values, { resetForm }) => {
          handleEditAndAddProject(values);
          resetForm();
        }}
      >
        {({ values, setFieldValue, errors, touched, resetForm }) => {
          const { logo } = values;
          return (
            <Form className={classes.inputFilter}>
              <Grid container>
                <Grid container item xs={12}>
                  <Grid item md={5} sm={12}>
                    <Box>
                      <Grid container className="input-group" item xs={12}>
                        <Grid item xs={4} className={classes.labelHead}>
                          {t('common:project_name')}
                        </Grid>
                        <Grid item xs={8}>
                          <Field name="name" component={InputField} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item md={5} sm={12}>
                    <Box>
                      <Grid container item xs={12}>
                        <Grid item xs={3} sx={{ paddingTop: '8px' }} className={classes.labelHead}>
                          Image
                        </Grid>
                        <Grid item xs={2}>
                          <CommonStyles.Button
                            isUpload
                            isIconButton
                            onChangeFile={(e) => {
                              const file = e.target.files[0];
                              //* Push to body for requesting API
                              setFieldValue('logoSelected', file);

                              encodeImageFileAsURL(file, (result) => {
                                setFieldValue('logo', result);
                              });
                            }}
                          >
                            <PhotoCamera sx={{ fontSize: 30 }} />
                          </CommonStyles.Button>
                        </Grid>

                        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={7}>
                          {logo && (
                            <Box className={classes.logo}>
                              <img src={logo.includes('uploads') ? BASE_IMAGE + logo : logo} alt="logo" />
                            </Box>
                          )}
                          {errors.logo ? <div className="errMsg">{errors.logo}</div> : null}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container item xs={12} className={classes.btnFilter}>
                  <DeleteAction
                    className="btn btnDelete"
                    idProject={values.id}
                    handleDeleteProject={handleDeleteProject}
                    disabled={!isEdit}
                    handleSelectAll={handleSelectAll}
                  />
                  <CommonStyles.Button className="btn" type="reset" variant="outlined" disabled={isEdit}>
                    {t('common:cancel')}
                  </CommonStyles.Button>

                  <CommonStyles.Button className="btn" type="submit">
                    {isEdit ? t('common:edit_project') : t('common:add-new')}
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

CreateAndUpdateProject.propTypes = propTypes;
export default CreateAndUpdateProject;
