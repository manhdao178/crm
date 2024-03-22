import { AUTH_CHANGE_PASSWORD, AUTH_LINE, AUTH_PROJECTS_URL } from 'constants/api';
import httpService from './httpServices';

class AuthServices {
    getAuthProject() {
        return httpService.get(AUTH_PROJECTS_URL);
    }
    editPassword(data) {
        return httpService.post(AUTH_CHANGE_PASSWORD, data)
    }
    getAuthLine() {
        return httpService.get(AUTH_LINE)
    }
}

export default new AuthServices();
