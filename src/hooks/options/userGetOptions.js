import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import userOptions from 'services/userOptions';

export const useGetOptions = (params) => {
    return useQuery([queryKeys.options, params], (params) => userOptions.getOptions(params));
};
