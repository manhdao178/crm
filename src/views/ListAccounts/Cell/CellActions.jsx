import React from 'react';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import { makeStyles } from '@mui/styles';
import DialogAddAndEditAccount from '../Dialogs/DialogAddAndEditAccount';

const useStyles = makeStyles((theme) => {
  return {
    btnGroup: {
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
  };
});

const CellActions = ({ item, handleAddAndEditAccount, handleDeleteAccount, isLoading }) => {
  //! State
  const classes = useStyles();

  const { open: openDelete, toggle: toggleDelete, shouldRender: shouldRenderDelete } = useToggleDialog();
  const { open: openEdit, toggle: toggleEdit, shouldRender: shouldRenderEdit } = useToggleDialog();

  //! Function
  const handleSubmit = async (value) => {
    await handleAddAndEditAccount(value, item?.id);
    toggleEdit();
  };

  //! Render
  return (
    <div className={classes.btnGroup}>
      {shouldRenderEdit && (
        <DialogAddAndEditAccount
          id={item.id}
          item={item}
          open={openEdit}
          isLoading={isLoading}
          toggle={toggleEdit}
          onSubmit={(value) => {
            handleSubmit(value);
          }}
        />
      )}

      <CommonStyles.Button onClick={toggleEdit} variant="text">
        <CommonIcons.IconEdit />
      </CommonStyles.Button>
    </div>
  );
};

export default CellActions;
