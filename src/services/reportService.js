import { ADS_MONTH_REPORT, ADS_TODAY_REPORT, GET_PERSONAL_REPORT, GET_TEAM_REPORT } from 'constants/api';
import moment from 'moment';
import httpServices from './httpServices';

class ReportService {
  getPersonalStatistics(params, projectID) {
    return httpServices.get(GET_PERSONAL_REPORT, {
      params: {
        startDate: moment(params?.from).toISOString(),
        endDate: moment(params?.to).toISOString(),
        project: projectID,
        branch: params?.branch,
        service: params?.service,
      },
    });
  }
  getTeamStatistics(params, projectID) {
    return httpServices.get(GET_TEAM_REPORT, {
      params: {
        startDate: moment(params?.from).toISOString(),
        endDate: moment(params?.to).toISOString(),
        project: projectID,
        service: params?.service,
        branch: params?.branch,
        user: params?.employee,
      },
    });
  }
  getADSToday(params) {
    return httpServices.get(ADS_TODAY_REPORT, { params: params.queryKey[1] });
  }
  getADSMonth(params) {
    return httpServices.get(ADS_MONTH_REPORT, { params: params.queryKey[1] });
  }
  getContactQuality(params) {
    return httpServices.get(`${GET_TEAM_REPORT}/contact-quality`, {
      params: {
        ...params.queryKey[1],
        startDate: moment(params.queryKey[1]?.from).toISOString(),
        endDate: moment(params.queryKey[1]?.to).toISOString(),
      },
    });
  }
  getStatisticPagelead(params) {
    return httpServices.get(`${GET_TEAM_REPORT}/pagelead-statistics`, { params: params.queryKey[1] });
  }
  getStatisticFanpage(params) {
    return httpServices.get(`${GET_TEAM_REPORT}/fanpage-statistics`, { params: params.queryKey[1] });
  }
  getStatisticTelesaleRank(params) {
    return httpServices.get(`${GET_TEAM_REPORT}/telesale-ranks`, { params: params.queryKey[1] });
  }
  getContactQualityPersonal(params) {
    return httpServices.get(`${GET_TEAM_REPORT}/personal-contact-quality`, {
      params: {
        ...params.queryKey[1],
        startDate: moment(params.queryKey[1]?.from).toISOString(),
        endDate: moment(params.queryKey[1]?.to).toISOString(),
      },
    });
  }
}

export default new ReportService();
