import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import usersServices from 'services/usersServices';

export const useGetListPermission = (params) => {
  return useQuery([queryKeys.permission, params], (params) => usersServices.getUsers(params));
};
