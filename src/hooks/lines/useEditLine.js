import { useMutation } from 'react-query';
import linesServices from 'services/linesServices';

export const useEditline = () => {
  return useMutation(linesServices.editLine);
};
