import { useQuery } from "react-query"
import usersServices from "services/usersServices"

export const useGetUserTitleOption = () => {
    return useQuery([], () => usersServices.getUserTitleOption())
}