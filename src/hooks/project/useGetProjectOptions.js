import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import projectServices from 'services/projectServices';

export const useGetListProjectOptions = () => {
  return useQuery([queryKeys.projects], () => projectServices.getProjectOptions());
};
