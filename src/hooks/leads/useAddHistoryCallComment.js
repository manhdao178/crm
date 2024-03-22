import { useMutation } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useAddHistoryCallComment = () => {
  return useMutation(leadsServices.addHistoryCallComment);
};
