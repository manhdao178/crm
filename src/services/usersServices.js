import httpService from './httpServices';
import { USERS_URL, USER_TITLE } from 'constants/api';
import querystring from 'query-string';

class UsersServices {
  getUsers(params) {
    return httpService.get(USERS_URL, { params: params.queryKey[1] });
  }
  deleteUsers(id) {
    return httpService.delete(`${USERS_URL}/${id}`);
  }
  addUser(data) {
    return httpService.post(USERS_URL, data);
  }
  editUser(payload) {
    const { _id, ...data } = payload;
    return httpService.patch(`${USERS_URL}/${_id}`, data);
  }
  getDetail(params) {
    return httpService.get(`${USERS_URL}/${params.queryKey[1]}`);
  }

  getUserOptions(params) {
    return httpService.get(`${USERS_URL}/options?${querystring.stringify(params)}`);
  }
  resetPassword(id) {
    return httpService.post(`${USERS_URL}/${id}/reset-password`);
  }
  getUserTitleOption() {
    return httpService.get(`${USER_TITLE}/options`)
  }
}

export default new UsersServices();
