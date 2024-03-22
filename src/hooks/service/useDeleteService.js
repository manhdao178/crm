import { useMutation } from 'react-query';
import servicesServices from 'services/servicesServices';

export const useDeleteService = () => {
    return useMutation(servicesServices.deleteService);
};
