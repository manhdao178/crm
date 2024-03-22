import { useMutation } from 'react-query';
import branchServices from 'services/branchServices';

export const useEditBranch = () => {
    return useMutation(branchServices.editBranchs);
};
