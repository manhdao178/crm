import { useMutation } from 'react-query';
import usersServices from 'services/usersServices';

export const useDeleteUser = () => {
  return useMutation(usersServices.deleteUsers);
};
