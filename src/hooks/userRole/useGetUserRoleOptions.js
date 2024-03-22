import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import userRoleServices from 'services/userRoleServices';

export const useGetUserRoleOptions = () => {
  return useQuery([queryKeys['user-role']], () => userRoleServices.getUserRoleOptions());
};
