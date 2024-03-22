import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import { Fragment } from 'react';
import { Box } from '@mui/system';

import Edit from 'assets/IconsSVG/UserList/Edit.svg';
import Delete from 'assets/IconsSVG/UserList/Delete.svg';
import { useCallback } from 'react';
import DialogAddUser from '../Dialog/DialogAddUser';
import { useDeleteUser } from 'hooks/users/useDeleteUser';
import { showError, showSuccess } from 'helpers/toast';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {
    edit: {
      backgroundImage: `url(${Edit})`,
      width: '20px',
      height: '20px',
    },
    delete: {
      backgroundImage: `url(${Delete})`,
      width: '20px',
      height: '20px',
    },
    loading: {
      width: '24px !important',
      height: '24px !important',
    },
  };
});

const CellActions = ({ user, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { open: openDelete, toggle: toggleDelete, shouldRender: shouldRenderDelete } = useToggleDialog();
  const { open: openDetail, toggle: toggleDetail, shouldRender: shouldRenderDetail } = useToggleDialog();

  const { isLoading: isDeletingUser, mutateAsync: deleteUser } = useDeleteUser();

  //! Function

  const onDelete = useCallback(async () => {
    try {
      await deleteUser(user?._id);
      toggleDelete();
      refetch();
      showSuccess(t('common:userlist_deleteSuccess'));
    } catch (error) {
      showError(error?.response.data.messages[0] || t('common:userlist_errors'));
    }
  }, [user]);

  //! Render
  return (
    <Fragment>
      {shouldRenderDetail && <DialogAddUser user={user} open={openDetail} toggle={toggleDetail} refetch={refetch} />}

      {shouldRenderDelete && (
        <CommonStyles.Modal
          open={openDelete}
          toggle={toggleDelete}
          header={t('common:userlist_deleteTitle')}
          content={t('common:userlist_deleteConfirm')}
          footer={
            <Fragment>
              <CommonStyles.Button onClick={toggleDelete} variant="outlined" loading={isDeletingUser}>
                Cancel
              </CommonStyles.Button>
              <CommonStyles.Button onClick={onDelete} loading={isDeletingUser} style={{ width: '92px' }}>
                Delete
              </CommonStyles.Button>
            </Fragment>
          }
        />
      )}
      <div style={{ width: '150px' }}>
        <CommonStyles.Button onClick={toggleDetail} variant="text">
          <CommonIcons.IconEdit />
        </CommonStyles.Button>
        <CommonStyles.Button onClick={toggleDelete} variant="text">
          <CommonIcons.IconDelete />
        </CommonStyles.Button>
      </div>
    </Fragment>
  );
};

export default CellActions;
