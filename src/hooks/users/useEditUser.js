import { useMutation } from 'react-query';
import usersServices from 'services/usersServices';

export const useEditUser = () => {
  return useMutation(usersServices.editUser);
};
