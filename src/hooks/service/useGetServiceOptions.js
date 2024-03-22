import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import servicesServices from 'services/servicesServices';

export const useGetservicesOptions = (params) => {
  return useQuery([queryKeys.services, params], (params) => servicesServices.getServicesOptions(params));
};
