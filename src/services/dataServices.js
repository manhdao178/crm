import httpService from './httpServices';
import { FANPAGE_DATA_URL, FANPAGE_DATA_MANAGE_URL } from 'constants/api';

class DatasServices {
    getDataFanpage(params) {
        return httpService.get(FANPAGE_DATA_URL, { params: params.queryKey[1] });
    }
    getDataFanpageManage(params) {
        return httpService.get(FANPAGE_DATA_MANAGE_URL, { params: params.queryKey[1] });
    }
    postDataFanpage(data) {
        return httpService.post(FANPAGE_DATA_URL, data);
    }
    editDataFanpage(payload) {
        const { data, id } = payload;
        return httpService.patch(`${FANPAGE_DATA_URL}/${id}`, data);
    }
}
export default new DatasServices();
