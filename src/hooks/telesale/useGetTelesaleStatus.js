import { queryKeys } from "constants/index";
import { useQuery } from "react-query";
import telesaleServices from "services/telesaleServices";

export const useGetTelesaleStatus = (params) => {
    return useQuery([queryKeys.teleStatus, params], (params) => telesaleServices.getTelesaleStatus(params));
};