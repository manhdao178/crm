import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import projectsService from 'services/projectsService';

export const useGetListProject = (params) => {
    return useQuery([queryKeys.users, params], (params) => projectsService.getProjects(params));
};
