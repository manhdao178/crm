import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import servicesServices from 'services/servicesServices';

export const useGetListServices = (params) => {
  return useQuery([queryKeys.servicesList, params], (params) => servicesServices.getListServices(params));
};
