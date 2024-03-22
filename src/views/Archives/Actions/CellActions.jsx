import React from 'react';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import { makeStyles } from '@mui/styles';
import DialogEditArchives from '../Dialogs/DialogEditArchives';
import { useUnArchived } from 'hooks/archives/useUnArchived';
import { useCallback } from 'react';
import httpServices from 'services/httpServices';
import ContentModal from '../Modal/ModalEdit/ContentModal';

const useStyles = makeStyles((theme) => {
  return {
    btnGroup: {
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
  };
});

const CellActions = ({ item, handleEditArchives, handleUnArchived, isLoading }) => {
  //! State
  const classes = useStyles();
  const { open: openEdit, toggle: toggleEdit, shouldRender: shouldRenderEdit } = useToggleDialog();
  const { isLoading: resettingUnArchived, mutateAsync: unArchived } = useUnArchived();
  const projectKey = httpServices.getUserInfoStorage();
  const roleKey = projectKey?.userRoleDetail?.key || '';

  //! Function
  const handleSubmit = async (values) => {
    await handleEditArchives(values, item?._id);
    toggleEdit();
  };

  const onClickUnArchived = useCallback(async () => {
    handleUnArchived(item?._id);
  }, [item]);

  //! Render
  return (
    <div className={classes.btnGroup}>
      {shouldRenderEdit && (
        <CommonStyles.Modal
          open={openEdit}
          toggle={toggleEdit}
          content={<ContentModal item={item} toggle={toggleEdit} />}
        />
      )}

      {/* {roleKey !== 'TELESALE_LEAD' ? ( */}
      <CommonStyles.Button onClick={onClickUnArchived} variant="text">
        <CommonIcons.SkipPreviousIcon sx={{ color: '#008638' }} />
      </CommonStyles.Button>
      {/* ) : (
        ''
      )} */}

      <CommonStyles.Button onClick={toggleEdit} variant="text">
        <CommonIcons.IconEdit />
      </CommonStyles.Button>
    </div>
  );
};

export default CellActions;
