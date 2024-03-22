import { useMutation } from 'react-query';
import leadAppointment from 'services/leadAppointment';

export const useAddAppointment = () => {
    return useMutation(leadAppointment.addAppointment);
};