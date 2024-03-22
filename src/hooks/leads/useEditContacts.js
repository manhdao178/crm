import { useMutation } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useEditContacts = () => {
  return useMutation(leadsServices.editContact);
};
