import { useMutation } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useAddContactsTeleSale = () => {
  return useMutation(leadsServices.addContactTeleSale);
};
