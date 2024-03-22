import { useMutation } from 'react-query';
import servicesServices from 'services/servicesServices';

export const useEditService = () => {
    return useMutation(servicesServices.editService);
};
