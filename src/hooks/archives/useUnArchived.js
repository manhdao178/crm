import { useMutation } from 'react-query';
import leadArchives from 'services/leadArchives';

export const useUnArchived = () => {
    return useMutation(leadArchives.postUnAchives);
};
