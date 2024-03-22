import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import projectServices from 'services/projectServices';

export const useGetProjectDetail = (id) => {
    return useQuery([queryKeys.projects, id], (id) => projectServices.getProjectDetail(id), { enabled: !!id });
};