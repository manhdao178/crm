import { useMutation } from 'react-query';
import projectsService from 'services/projectsService';

export const useAddProject = () => {
    return useMutation(projectsService.addProjects);
};
