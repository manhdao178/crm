import httpService from './httpServices';
import { CALENDAR_URL } from 'constants/api';

class LeadCalendar {
    getCalendar(params) {
        return httpService.get(CALENDAR_URL, { params: params.queryKey[1] });
    }
    addCalendar(data) {
        return httpService.post(CALENDAR_URL, data);
    }
}

export default new LeadCalendar();
