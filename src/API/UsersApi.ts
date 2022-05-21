import {getItemsType, instance, ApiRespType} from "./Api";
import {FilterType} from "../Components/redux/user-reducer";

export const usersApi = {
    getUsersApi(currentPage: number = 1, pageSize: number = 10, filter: FilterType) {
        return instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${filter.term}`
            + (filter.friend === null ? '' : `&friend=${filter.friend}`))
            .then(response => {
                return response.data
            })
    },
    unFollow(id: number) {
        return instance.delete<ApiRespType>(`follow/${id}`).then(response => {
            return response.data
        })
    },
    follow(id: number) {
        return instance.post<ApiRespType>(`follow/${id}`).then(response => {
            return response.data
        })
    }
}
export type UserType = {
    id: number
    photos: { small: string | null, large: string | null }
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string }
}

