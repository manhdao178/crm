import httpService from './httpServices';
import { BRANCHS_URL } from 'constants/api';

class BranchsServices {
  getBranchs(params) {
    return httpService.get(BRANCHS_URL, { params: params.queryKey[1] });
  }
  getBranchsOptions() {
    return httpService.get(`${BRANCHS_URL}/options`);
  }
  addBranchs(data) {
    return httpService.post(BRANCHS_URL, data);
  }
  editBranchs(payload) {
    const { data, id } = payload;
    return httpService.patch(`${BRANCHS_URL}/${id}`, data);
  }
  deleteBranch(id) {
    return httpService.delete(`${BRANCHS_URL}/${id}`);
  }

}

export default new BranchsServices();
