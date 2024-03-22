import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useGetDataLeadsManage = (params, options) => {
  return useQuery([queryKeys.leads_Manage, params], (params) => leadsServices.getDataLeadsManage(params), options);
};
