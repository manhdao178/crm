import React, { useCallback, useEffect, useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useEditDataFanpage } from 'hooks/leads/useEditDataFanpage';
import { showError, showSuccess } from 'helpers/toast';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';

const CellWrongNumber = ({ row, isEdit }) => {
  //! State
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: editIsBadPhoneNumber } = useEditDataFanpage();

  //! Effect

  const handleCheck = async () => {
    try {
      await editIsBadPhoneNumber({ id: row._id, data: { isBadPhoneNumber: !row?.isBadPhoneNumber } });
      showSuccess('Cập nhật số sai thành công');
      await queryClient.refetchQueries([queryKeys.dataPage]);
    } catch (error) {
      console.log('error: ', error);
      showError('Cập nhật số sai thất bại');
    }
  };

  //! Function

  //! Render
  return (
    <div>
      <CommonStyles.Checkbox
        checked={row?.isBadPhoneNumber || row?.isDuplicatePhoneNumber}
        onClick={handleCheck}
        disabled={row?.isDuplicatePhoneNumber || !isEdit}
      />
    </div>
  );
};

export default CellWrongNumber;
