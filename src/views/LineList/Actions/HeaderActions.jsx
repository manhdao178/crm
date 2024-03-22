import React from 'react';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogDeleteLine from 'views/LineList/Dialogs/DialogDeleteLine';
import DialogAddAndEditLine from 'views/LineList/Dialogs/DialogAddAndEditLine';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const HeaderActions = ({ handleAddAndEditLine, isLoading }) => {
  //! State
  const { open: openAdd, toggle: toggleAdd, shouldRender: shouldRenderAdd } = useToggleDialog();
  const { t } = useTranslation();
  //! Function
  const handleSubmit = async (value) => {
    await handleAddAndEditLine(value);
    toggleAdd();
  };

  //! Render
  return (
    <div>
      {shouldRenderAdd && (
        <DialogAddAndEditLine
          isLoading={isLoading}
          open={openAdd}
          toggle={toggleAdd}
          onSubmit={(value) => {
            handleSubmit(value);
          }}
        />
      )}

      <CommonStyles.Button style={{ display: 'flex', gap: '6px', paddingLeft: '14px' }} onClick={toggleAdd}>
        <CommonIcons.Add />
        {t('common:line_add')}
      </CommonStyles.Button>
    </div>
  );
};

export default HeaderActions;
