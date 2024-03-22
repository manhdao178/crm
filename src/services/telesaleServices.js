import httpService from './httpServices';
import { AUTH_TELESALE_URL, AUTH_TELESALE_LEAD_URL, TELESALE_STATUS } from 'constants/api';

class TelesaleServices {
  getTelesaleDashboard(params) {
    return httpService.get(AUTH_TELESALE_URL, {
      params: {
        project: params
      }
    });
  }
  getTelesaleLeadDashboard(params) {
    return httpService.get(AUTH_TELESALE_LEAD_URL, {
      params: {
        project: params
      }
    });
  }
  getTelesaleStatus(params) {
    return httpService.get(TELESALE_STATUS, { params: params.queryKey[1] })
  }
  editTelesaleStatus(payload) {
    const { id, ...data } = payload
    return httpService.patch(`${TELESALE_STATUS}/${id}`, data)
  }
}

export default new TelesaleServices();
