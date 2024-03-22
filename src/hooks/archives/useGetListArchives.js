import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import leadArchives from 'services/leadArchives';

export const useGetListArchives = (params) => {
    return useQuery([queryKeys.archives, params], (params) => leadArchives.getArchives(params));
};
