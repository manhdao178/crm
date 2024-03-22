import { useMutation } from 'react-query';
import dataServices from 'services/dataServices';

export const useEditDataFanpage = () => {
    return useMutation(dataServices.editDataFanpage);
};
