import { useMutation } from 'react-query';
import servicesServices from 'services/servicesServices';

export const useAddService = () => {
    return useMutation(servicesServices.addService);
};
