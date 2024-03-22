import httpService from './httpServices';
import { AUTH_FANPAGE_ADMIN_URL, LEADS_FANPAGE_URL, LEADS_URL, LEAD_CALLS, LEAD_CALLS_COMMENTS } from 'constants/api';

class LeadsServices {
  getDataLeads(params) {
    return httpService.get(LEADS_URL, { params: params.queryKey[1] });
  }
  getDataLeadsManage(params) {
    return httpService.get(`${LEADS_URL}/manage`, { params: params.queryKey[1] });
  }
  getDetailDataLeads(params) {
    const id = params.queryKey[1];
    return httpService.get(`${LEADS_URL}/${id}`);
  }
  getAppointment(params) {
    return httpService.get(LEADS_URL, { params: params.queryKey[1] });
  }
  addContactTeleSale(data) {
    return httpService.post(`${LEADS_URL}/telesale`, data);
  }
  addContactLeadTeleSale(data) {
    return httpService.post(`${LEADS_URL}/lead-telesale`, data);
  }
  addAppointment(payload) {
    const { id, ...data } = payload;
    return httpService.post(`${LEADS_URL}/${id}/appointment`, data);
  }
  editContact(payload) {
    const { _id, ...data } = payload;
    return httpService.patch(`${LEADS_URL}/${_id}`, data);
  }
  postDataLeads(data) {
    return httpService.post(LEADS_FANPAGE_URL, data);
  }
  getDataFanpageAdmin(params) {
    return httpService.get(AUTH_FANPAGE_ADMIN_URL, {
      params: {
        project: params.queryKey[1],
      },
    });
  }
  addLeadCalls(data) {
    return httpService.post(LEAD_CALLS, data);
  }
  getHistoryCall(params) {
    return httpService.get(LEAD_CALLS, { params: params.queryKey[1] });
  }
  addHistoryCallComment(data) {
    return httpService.post(LEAD_CALLS_COMMENTS, data);
  }
  getHistoryCallComment(params) {
    return httpService.get(LEAD_CALLS_COMMENTS, { params: params.queryKey[1] });
  }
  getListQualityOption() {
    return httpService.get(`${LEADS_URL}/quality-options`)
  }
}

export default new LeadsServices();
