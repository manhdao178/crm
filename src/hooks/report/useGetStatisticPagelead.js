import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import reportService from 'services/reportService';

export const useGetStatisticPagelead = (params, status) => {
    if (status === 'team') {
        return useQuery([queryKeys.statisticPagelead, params], (params) => reportService.getStatisticPagelead(params));
    }
    return useQuery([queryKeys.statisticFanpage, params], (params) => reportService.getStatisticFanpage(params));

};
