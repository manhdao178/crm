import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import leadCalendar from 'services/leadCalendar';

export const useGetCalendar = (params) => {
    return useQuery([queryKeys.lines, params], (params) => leadCalendar.getCalendar(params));
};
