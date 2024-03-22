import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import dataServices from 'services/dataServices';

export const useGetDataFanpage = (params) => {
    return useQuery([queryKeys.dataPage, params], (params) => dataServices.getDataFanpage(params));
};
