import { USERS_OPTIONS_URL } from 'constants/api';
import httpService from './httpServices';

class userOptions {
    getOptions(params) {
        return httpService.get(USERS_OPTIONS_URL, { params: params.queryKey[1] });
    }
}

export default new userOptions();