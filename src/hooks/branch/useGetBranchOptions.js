import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import branchService from 'services/branchService';

export const useGetBranchOptions = (params, options) => {
  return useQuery([queryKeys.branchs, params], (params) => branchService.getBranchOptions(params), options);
};
