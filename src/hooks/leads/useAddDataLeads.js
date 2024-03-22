import { useMutation } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useAddDataLeads = () => {
    return useMutation(leadsServices.postDataLeads);
};
