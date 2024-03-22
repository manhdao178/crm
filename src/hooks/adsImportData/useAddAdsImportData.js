import { useMutation } from 'react-query';
import accountServices from 'services/accountServices';

export const useAddImportData = () => {
    return useMutation(accountServices.addDataAdsImport);
};
