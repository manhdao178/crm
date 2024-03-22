import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import statusServices from 'services/statusServices';

export const useGetStatusOptions = (params) => {
  return useQuery([queryKeys.status, params], (params) => statusServices.getStatusOptions(params));
};
