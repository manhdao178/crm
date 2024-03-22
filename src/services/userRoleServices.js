import httpService from './httpServices';
import { USER_ROLE_OPTIONS } from 'constants/api';

class UserRoleServices {
  getUserRoleOptions() {
    return httpService.get(USER_ROLE_OPTIONS);
  }
}

export default new UserRoleServices();
