import { useMutation } from 'react-query';
import usersServices from 'services/usersServices';

export const useAddUsers = () => {
  return useMutation(usersServices.addUser);
};
