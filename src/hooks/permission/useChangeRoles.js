import { useMutation } from 'react-query';
import userRolesServices from 'services/userRolesServices';

export const useChangeRoles = () => {
  return useMutation(userRolesServices.changeUserRoles);
};
