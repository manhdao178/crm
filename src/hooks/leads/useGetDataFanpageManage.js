import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import dataServices from 'services/dataServices';

export const useGetDataFanpageManage = (params) => {
    return useQuery([queryKeys.leads, params], (params) => dataServices.getDataFanpageManage(params));
};
