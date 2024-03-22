import { queryKeys } from 'constants';
import { useQuery } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useGetLeadAppointment = (params) => {
    return useQuery([queryKeys.leadsAppointment, params], (params) => leadsServices.getAppointment(params));
};
