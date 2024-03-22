import { GET_ADS_IMPORT_DATAS } from 'constants/api';
import httpService from './httpServices';

class AccountServices {
    getDataAdsImport() {
        return httpService.get(GET_ADS_IMPORT_DATAS);
    }
    editDataAdsImport(payload) {
        const { data, id } = payload
        return httpService.patch(`${GET_ADS_IMPORT_DATAS}/${id}`, data)
    }
    addDataAdsImport(data) {
        return httpService.post(GET_ADS_IMPORT_DATAS, data);
    }
}

export default new AccountServices();
