import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import linesServices from 'services/linesServices';

export const useGetLines = (params) => {
  return useQuery([queryKeys.lines, params], (params) => linesServices.getLines(params));
};
