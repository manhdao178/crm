import { queryKeys } from "constants"
import { useQuery } from "react-query"
import reportService from "services/reportService"

export const useGetRankTelesale = (params) => {
    return useQuery([queryKeys.rankTele, params], params => reportService.getStatisticTelesaleRank(params))
}