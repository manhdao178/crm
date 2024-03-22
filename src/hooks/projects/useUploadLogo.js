import { useMutation } from 'react-query';
import uploadService from 'services/uploadService';

export const useUploadLogo = () => {
    return useMutation(uploadService.uploadSingleFile);
};
