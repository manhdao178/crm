import httpService from './httpServices';
import { LEADS_ARCHIVES_URL } from 'constants/api';
import { LEADS_URL } from 'constants/api';


class LeadArchives {
    getArchives(params) {
        return httpService.get(LEADS_ARCHIVES_URL, { params: params.queryKey[1] });
    }
    postUnAchives(id) {
        return httpService.post(`${LEADS_URL}/${id}/unarchived`);
    }
    editArchives(payload) {
        const { data, id } = payload;
        return httpService.patch(`${LEADS_URL}/${id}`, data);
    }
}

export default new LeadArchives();
