import { useMutation } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useAddContactsLeadTeleSale = () => {
  return useMutation(leadsServices.addContactLeadTeleSale);
};
