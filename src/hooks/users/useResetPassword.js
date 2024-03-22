import { useMutation } from 'react-query';
import usersServices from 'services/usersServices';

export const useResetPassword = () => {
  return useMutation(usersServices.resetPassword);
};
