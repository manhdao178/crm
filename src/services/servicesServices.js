import httpService from './httpServices';
import { SERVICES_URL } from 'constants/api';

class ServicesServices {
  getListServices(params) {
    return httpService.get(SERVICES_URL, { params: params.queryKey[1] })
  }
  getServicesOptions() {
    return httpService.get(`${SERVICES_URL}/options`);
  }
  deleteService(id) {
    return httpService.delete(`${SERVICES_URL}/${id}`);
  }
  addService(data) {
    return httpService.post(SERVICES_URL, data);
  }
  editService(payload) {
    const { id, data } = payload;
    return httpService.patch(`${SERVICES_URL}/${id}`, data);
  }
}

export default new ServicesServices();
