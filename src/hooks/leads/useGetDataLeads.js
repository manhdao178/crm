import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useGetDataLeads = (params, options) => {
  return useQuery([queryKeys.leads, params], (params) => leadsServices.getDataLeads(params), options);
};
