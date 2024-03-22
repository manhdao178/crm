import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import leadAppointment from 'services/leadAppointment';

export const useGetAppointmentMy = (params) => {
    return useQuery([queryKeys.appointmentmy, params], (params) => leadAppointment.getAppointmentMy(params));
};
