import { useMutation } from 'react-query';
import leadArchives from 'services/leadArchives';

export const useEditArchived = () => {
    return useMutation(leadArchives.editArchives);
};
