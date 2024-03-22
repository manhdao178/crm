import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import reportService from 'services/reportService';

export const useGetReportDashboard = (key, params, projectID) => {
  return useQuery([queryKeys.personal, key, params], (key) => {
    if (key.queryKey[1] === 'personal') {
      return reportService.getPersonalStatistics(params, projectID);
    }
    if (key.queryKey[1] === 'team') {
      return reportService.getTeamStatistics(params, projectID);
    }
  });
};
