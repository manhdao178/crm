import { PROJECTS_URL } from 'constants/api';
import httpService from './httpServices';

class ProjectsServices {
    getProjects(params) {
        return httpService.get(PROJECTS_URL, { params: params.queryKey[1] });
    }
    deleteProjects(id) {
        return httpService.delete(`${PROJECTS_URL}/${id}`);
    }
    addProjects(data) {
        return httpService.post(PROJECTS_URL, data);
    }
    editProjects(payload) {
        const { data, id } = payload;
        return httpService.patch(`${PROJECTS_URL}/${id}`, data);
    }
}

export default new ProjectsServices();
