import React from 'react';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import { makeStyles } from '@mui/styles';
import DialogConfirmDelete from 'components/Dialog/DialogConfirmDelete';
import { useTranslation } from 'react-i18next';
import { useDeleteService } from 'hooks/service/useDeleteService';
import { showError, showSuccess } from 'helpers/toast';
import { useFormikContext } from 'formik';

const DeleteAction = ({ className, idService, refetch, disabled, handleSelectAll }) => {
  //! State
  const { open: openDelete, toggle: toggleDelete, shouldRender: shouldRenderDelete } = useToggleDialog();
  const { t } = useTranslation();
  const formik = useFormikContext();
  const { resetForm, initialValues } = formik;

  const { isLoading: isDeletingService, mutateAsync: deleteService } = useDeleteService();
  //! Function

  const handleDeleteService = async (id) => {
    try {
      const res = await deleteService(id);
      showSuccess(t('common:service_deleteSuccess'));
      toggleDelete();
      await refetch();
      resetForm({ values: { branch: '', name: '', funnel: '', note: '' } });
      handleSelectAll([]);
    } catch (error) {
      showError(t('common:service_deleteError'));
    }
  };
  //! Render
  return (
    <div>
      {shouldRenderDelete && (
        <DialogConfirmDelete
          open={openDelete}
          toggle={toggleDelete}
          header={t('common:services_delete')}
          content={t('common:services_confirmDelete')}
          textSubmit={t('common:delete')}
          onSubmit={() => {
            handleDeleteService(idService);
          }}
        />
      )}

      <CommonStyles.Button className={className} disabled={disabled} onClick={toggleDelete}>
        {t('common:delete')}
      </CommonStyles.Button>
    </div>
  );
};

export default DeleteAction;
