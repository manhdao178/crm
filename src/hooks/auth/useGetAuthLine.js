import { queryKeys } from "constants/index"
import { useQuery } from "react-query"
import authServices from "services/authServices"


export const useGetAuthLine = () => {
    return useQuery([queryKeys.authLine], () => authServices.getAuthLine())
}