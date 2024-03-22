import { useMutation } from 'react-query';
import branchServices from 'services/branchServices';

export const useAddBranch = () => {
    return useMutation(branchServices.addBranchs);
};
