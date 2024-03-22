import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useGetHistoryCall = (params, options) => {
  return useQuery([queryKeys.leadHistoryCalls, params], (params) => leadsServices.getHistoryCall(params), options);
};
