import httpService from './httpServices';
import { BRANCH_OPTIONS } from 'constants/api';

class BranchServices {
  getBranchOptions(params) {
    return httpService.get(BRANCH_OPTIONS, { params: params.queryKey[1] });
  }
}

export default new BranchServices();
