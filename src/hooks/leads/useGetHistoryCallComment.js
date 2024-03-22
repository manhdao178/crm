import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useGetHistoryCallComment = (params, options) => {
  return useQuery([queryKeys.leadComments, params], (params) => leadsServices.getHistoryCallComment(params), options);
};
