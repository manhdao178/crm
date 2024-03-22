import React from 'react';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogDeleteLine from 'views/LineList/Dialogs/DialogDeleteLine';
import DialogAddAndEditLine from 'views/LineList/Dialogs/DialogAddAndEditLine';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import DialogAddAndEditAccount from '../Dialogs/DialogAddAndEditAccount';

const HeaderActions = ({ handleAddAndEditAccount, isLoading }) => {
  //! State
  const { open: openAdd, toggle: toggleAdd, shouldRender: shouldRenderAdd } = useToggleDialog();
  const { t } = useTranslation();
  //! Function
  const handleSubmit = async (value) => {
    await handleAddAndEditAccount(value);
    toggleAdd();
  };

  //! Render
  return (
    <div>
      {shouldRenderAdd && (
        <DialogAddAndEditAccount
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
        {t('common:add_account')}
      </CommonStyles.Button>
    </div>
  );
};

export default HeaderActions;
