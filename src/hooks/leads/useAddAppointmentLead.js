import { useMutation } from 'react-query';
import leadsServices from 'services/leadsServices';

export const useAddAppointmentLead = () => {
  return useMutation(leadsServices.addAppointment);
};
