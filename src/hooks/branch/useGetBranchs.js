import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import branchServices from 'services/branchServices';


export const useGetBranchs = (params) => {
    return useQuery([queryKeys.projects, params], (params) => branchServices.getBranchs(params));
};
