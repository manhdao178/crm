import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useGetDetailDataLeads = (params, options) => {
  return useQuery([queryKeys.leadsDetails, params], (params) => leadsServices.getDetailDataLeads(params), options);
};
