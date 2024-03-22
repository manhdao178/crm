import { useMutation } from "react-query";
import telesaleServices from "services/telesaleServices";

export const useTelesaleStatus = () => {
    return useMutation(telesaleServices.editTelesaleStatus);
};