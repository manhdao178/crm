import { useMutation } from 'react-query';
import authServices from 'services/authServices';

export const useChangePassword = () => {
    return useMutation(authServices.editPassword);
};
