import React, { useCallback } from 'react';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import { makeStyles } from '@mui/styles';
import DialogConfirmDelete from 'components/Dialog/DialogConfirmDelete';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { showError, showInfo, showSuccess } from 'helpers/toast';
import { useDeleteBranch } from 'hooks/branch/useDeleteBranch';

const DeleteBranchAction = ({ className, disabled, handleSelectAll, idBranch, refetch }) => {
  //! State
  const { open: openDelete, toggle: toggleDelete, shouldRender: shouldRenderDelete } = useToggleDialog();
  const { isLoading: isDeletingBranch, mutateAsync: deleteBranch } = useDeleteBranch();

  const { t } = useTranslation();
  const formik = useFormikContext();
  const { resetForm, initialValues } = formik;

  //! Function

  const onDeleteBranch = useCallback(async () => {
    try {
      await deleteBranch(idBranch);
      resetForm({
        values: {
          project: '',
          name: '',
          phoneNumber: '',
          email: '',
          address: '',
        },
      });
      showSuccess(t('common:deleteBranch_success'));
      await refetch();
      toggleDelete();
      handleSelectAll([]);
    } catch (error) {
      showError(t('common:deleteBranch_error'));
    }
  }, [idBranch]);

  //! Render
  return (
    <div>
      {shouldRenderDelete && (
        <DialogConfirmDelete
          open={openDelete}
          toggle={toggleDelete}
          header={t('common:delete_branch')}
          content={t('common:deleteConfirm_branch')}
          textSubmit={t('common:delete')}
          onSubmit={onDeleteBranch}
        />
      )}

      <CommonStyles.Button disabled={disabled} color="error" className={className} onClick={toggleDelete}>
        {t('common:delete')}
      </CommonStyles.Button>
    </div>
  );
};

export default DeleteBranchAction;
