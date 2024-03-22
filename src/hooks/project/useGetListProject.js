import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import projectServices from 'services/projectServices';

export const useGetListProjects = (params) => {
  return useQuery([queryKeys.projects, params], (params) => projectServices.getListProject(params));
};
