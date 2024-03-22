import httpService from './httpServices';
import { APPOINTMENT_URL } from 'constants/api';

class LeadAppointment {
  getAppointment(params) {
    return httpService.get(APPOINTMENT_URL, { params: params.queryKey[1] });
  }
  getAppointmentMy(params) {
    return httpService.get(`${APPOINTMENT_URL}/my`, { params: params.queryKey[1] });
  }
  getAppointmentLeadManage(params) {
    return httpService.get(`${APPOINTMENT_URL}/management`, { params: params.queryKey[1] });
  }
  addAppointment(data) {
    return httpService.post(APPOINTMENT_URL, data);
  }
  editAppointment(payload) {
    const { id, ...data } = payload;
    return httpService.patch(`${APPOINTMENT_URL}/${id}`, data);
  }
}

export default new LeadAppointment();
