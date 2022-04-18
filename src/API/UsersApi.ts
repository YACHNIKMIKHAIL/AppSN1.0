import {getItemsType, instance} from "./Api";

export const usersApi = {
    getUsersApi(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unFollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => {
            return response.data
        })
    },
    follow(id: number) {
        return instance.post<FollowUnfollowUserType>(`follow/${id}`).then(response => {
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

type FollowUnfollowUserType = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
