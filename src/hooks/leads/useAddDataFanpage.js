import { useMutation } from 'react-query';
import dataServices from 'services/dataServices';

export const useAddDataFanpage = () => {
    return useMutation(dataServices.postDataFanpage);
};
