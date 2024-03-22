import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import accountServices from 'services/accountServices';

export const useGetAdsImportData = (params) => {
    return useQuery([queryKeys.adsImport, params], (params) => accountServices.getDataAdsImport(params));
};
