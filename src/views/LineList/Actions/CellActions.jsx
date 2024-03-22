import React from 'react';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogDeleteLine from 'views/LineList/Dialogs/DialogDeleteLine';
import DialogAddAndEditLine from 'views/LineList/Dialogs/DialogAddAndEditLine';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    btnGroup: {
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
  };
});

const CellActions = ({ item, handleAddAndEditLine, handleDeleteLine, isLoading }) => {
  //! State
  const classes = useStyles();

  const { open: openDelete, toggle: toggleDelete, shouldRender: shouldRenderDelete } = useToggleDialog();
  const { open: openEdit, toggle: toggleEdit, shouldRender: shouldRenderEdit } = useToggleDialog();

  //! Function
  const handleSubmit = async (value) => {
    await handleAddAndEditLine(value, item?.id);
    toggleEdit();
  };

  const handleDelete = async () => {
    await handleDeleteLine(item?.id);
    toggleDelete();
  };

  //! Render
  return (
    <div className={classes.btnGroup}>
      {shouldRenderDelete && (
        <DialogDeleteLine open={openDelete} toggle={toggleDelete} handleDelete={handleDelete} isLoading={isLoading} />
      )}

      {shouldRenderEdit && (
        <DialogAddAndEditLine
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

      <CommonStyles.Button onClick={toggleDelete} variant="text">
        <CommonIcons.IconDelete />
      </CommonStyles.Button>
    </div>
  );
};

export default CellActions;
