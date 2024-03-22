import { useMutation } from 'react-query';
import projectsService from 'services/projectsService';

export const useEditProject = () => {
    return useMutation(projectsService.editProjects);
};
