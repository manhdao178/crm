import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import reportService from 'services/reportService';
export const useGetADSMonth = (params) => {
    return useQuery([queryKeys.adsMonth, params], (params) => reportService.getADSMonth(params));
};