import React, { useCallback } from 'react';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import { makeStyles } from '@mui/styles';
import DialogConfirmDelete from 'components/Dialog/DialogConfirmDelete';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

const DeleteAction = ({ className, disabled, idProject, handleDeleteProject, handleSelectAll }) => {
  //! State
  const { open: openDelete, toggle: toggleDelete, shouldRender: shouldRenderDelete } = useToggleDialog();
  const { t } = useTranslation();
  const formik = useFormikContext();
  const { resetForm, initialValues } = formik;

  //! Function

  const onDeleteProject = useCallback(async () => {
    await handleDeleteProject(idProject);
    toggleDelete();
    resetForm({
      values: {
        name: '',
        logo: '',
      },
    });
    handleSelectAll([]);
  }, [idProject]);

  //! Render
  return (
    <div>
      {shouldRenderDelete && (
        <DialogConfirmDelete
          open={openDelete}
          toggle={toggleDelete}
          header={t('common:delete_project')}
          content={t('common:deleteConfirm_project')}
          textSubmit={t('common:delete')}
          onSubmit={onDeleteProject}
        />
      )}

      <CommonStyles.Button disabled={disabled} color="error" className={className} onClick={toggleDelete}>
        {t('common:delete')}
      </CommonStyles.Button>
    </div>
  );
};

export default DeleteAction;
