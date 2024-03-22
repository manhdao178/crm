import httpService from './httpServices';
import { USERS_URL, USER_ROLES_URL } from 'constants/api';

class UserRolesServices {
  getUserRoles(params) {
    return httpService.get(USER_ROLES_URL, { params: params.queryKey[1] });
  }
  getUserRolesOptions() {
    return httpService.get(`${USER_ROLES_URL}/options`);
  }
  changeUserRoles(payload) {
    const data = payload;
    return httpService.patch(`${USERS_URL}/roles`, data);
  }
}

export default new UserRolesServices();
