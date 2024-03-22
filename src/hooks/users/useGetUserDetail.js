import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import usersServices from 'services/usersServices';

export const useGetUserDetail = (params, options) => {
  return useQuery([queryKeys['user-detail'], params], (params) => usersServices.getDetail(params), options);
};
