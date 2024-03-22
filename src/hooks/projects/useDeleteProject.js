import { useMutation } from 'react-query';
import projectsService from 'services/projectsService';

export const useDeleteProject = () => {
    return useMutation(projectsService.deleteProjects);
};
