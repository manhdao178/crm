import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import usersServices from 'services/usersServices';

export const useGetListUsers = (params) => {
  return useQuery([queryKeys.users, params], (params) => usersServices.getUsers(params));
};
