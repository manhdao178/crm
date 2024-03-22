import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import receptionServices from 'services/receptionServices';

export const useGetReceptions = (params, options) => {
  return useQuery([queryKeys.reception, params], (params) => receptionServices.getServices(params), options);
};
