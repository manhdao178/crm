import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import leadAppointment from 'services/leadAppointment';

export const useGetAppointment = (params) => {
    return useQuery([queryKeys.appointment, params], (params) => leadAppointment.getAppointment(params));
};
