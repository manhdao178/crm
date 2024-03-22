import { useMutation } from 'react-query';
import linesServices from 'services/linesServices';

export const useDeleteLine = () => {
  return useMutation(linesServices.deleteLine);
};
