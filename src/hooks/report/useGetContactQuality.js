import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import reportService from 'services/reportService';


export const useGetContactQuality = (params, status) => {
    if (status === 'team') {
        return useQuery([queryKeys.contactQuality, params], (params) => reportService.getContactQuality(params));
    }
    if (status === 'personal') {
        return useQuery([queryKeys.contactQualityPersonal, params], (params) => reportService.getContactQualityPersonal(params))
    }
};
