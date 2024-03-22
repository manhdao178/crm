import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import authServices from 'services/authServices';

export const useGetListAuthProject = () => {
    return useQuery([queryKeys.projects], () => authServices.getAuthProject());
};
