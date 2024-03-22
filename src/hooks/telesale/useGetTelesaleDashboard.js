import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import telesaleServices from 'services/telesaleServices';

export const useGetTelesaleDashboard = (key, params) => {
  return useQuery([queryKeys.telesales, key], (key) => {
    if (key.queryKey[1] === 'TELESALE') {
      return telesaleServices.getTelesaleDashboard(params);
    } else {
      return telesaleServices.getTelesaleLeadDashboard(params);
    }
  });
};
