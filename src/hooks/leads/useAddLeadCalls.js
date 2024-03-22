import { useMutation } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useAddLeadCalls = () => {
  return useMutation(leadsServices.addLeadCalls);
};
