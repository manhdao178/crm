import React from 'react';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogDeleteLine from 'views/LineList/Dialogs/DialogDeleteLine';
import { makeStyles } from '@mui/styles';
import ModalEditAppointment from '../Modal/ModalEditAppointment';

const useStyles = makeStyles((theme) => {
  return {
    btnGroup: {
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
  };
});

const CellEditAppoitment = ({ item, isLoading, disabled }) => {
  //! State
  const classes = useStyles();

  const { open: openEdit, toggle: toggleEdit, shouldRender: shouldRenderEdit } = useToggleDialog();

  //! Function

  //! Render
  return (
    <div className={classes.btnGroup}>
      {shouldRenderEdit && (
        <ModalEditAppointment item={item} open={openEdit} isLoading={isLoading} toggle={toggleEdit} />
      )}

      <CommonStyles.Button onClick={toggleEdit} variant="text" disabled={disabled}>
        <CommonIcons.IconEdit />
      </CommonStyles.Button>
    </div>
  );
};

export default CellEditAppoitment;
