import { RECEPTION_URL } from 'constants/api';
import httpService from './httpServices';

class ReceptionServices {
    getServices(params) {
        return httpService.get(RECEPTION_URL, { params: params.queryKey[1] });
    }
}

export default new ReceptionServices();