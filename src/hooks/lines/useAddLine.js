import { useMutation } from 'react-query';
import linesServices from 'services/linesServices';

export const useAddLine = () => {
  return useMutation(linesServices.addLine);
};
