import httpService from './httpServices';
import { LINES_URL } from 'constants/api';

class LinesServices {
  getLines(params) {
    return httpService.get(LINES_URL, { params: params.queryKey[1] });
  }
  deleteLine(id) {
    return httpService.delete(`${LINES_URL}/${id}`);
  }
  addLine(data) {
    return httpService.post(LINES_URL, data);
  }
  editLine(payload) {
    const { data, id } = payload;
    return httpService.patch(`${LINES_URL}/${id}`, data);
  }
}

export default new LinesServices();
