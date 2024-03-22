import { queryKeys } from 'constants/index';
import { useQuery } from 'react-query';
import leadAppointment from 'services/leadAppointment';

export const useGetLeadAppointmentManage = (params) => {
    return useQuery([queryKeys.appointmentLeadManage, params], (params) => leadAppointment.getAppointmentLeadManage(params));
};
