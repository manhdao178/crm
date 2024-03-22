import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useGetDataFanpageAdmin = (params) => {
    return useQuery([queryKeys.leads, params], (params) => leadsServices.getDataFanpageAdmin(params));
};
