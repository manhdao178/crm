import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import reportService from 'services/reportService';


export const useGetADSToday = (params) => {
    return useQuery([queryKeys.adsToday, params], (params) => reportService.getADSToday(params));
};
