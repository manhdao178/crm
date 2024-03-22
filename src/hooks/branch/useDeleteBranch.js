import { useMutation } from 'react-query';
import branchServices from 'services/branchServices';

export const useDeleteBranch = () => {
    return useMutation(branchServices.deleteBranch);
};
