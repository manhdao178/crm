import { useMutation } from 'react-query';
import leadAppointment from 'services/leadAppointment';

export const useEditAppointment = () => {
    return useMutation(leadAppointment.editAppointment);
};
