import { useMutation } from 'react-query';
import accountServices from 'services/accountServices';

export const useEditAdsImportData = () => {
    return useMutation(accountServices.editDataAdsImport);
};
