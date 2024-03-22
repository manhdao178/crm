import { useQuery } from "react-query"
import leadsServices from "services/leadsServices"

export const useGetQualityOption = () => {
    return useQuery([], () => leadsServices.getListQualityOption())
}