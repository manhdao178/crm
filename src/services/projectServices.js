import httpService from './httpServices';
import { PROJECT_OPTIONS, PROJECTS_URL } from 'constants/api';

class ProjectServices {
  getProjectOptions() {
    return httpService.get(PROJECT_OPTIONS);
  }
  getListProject(params) {
    return httpService.get(PROJECTS_URL, { params: { ...params } });
  }
  getProjectDetail(payload) {
    return httpService.get(PROJECTS_URL + `/${payload.queryKey[1]}`);
  }
}

export default new ProjectServices();
