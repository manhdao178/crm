import httpService from './httpServices';
import { LEADS_URL } from 'constants/api';

class StatusServices {
  getStatusOptions() {
    return httpService.get(`${LEADS_URL}/status-options`);
  }
}

export default new StatusServices();
