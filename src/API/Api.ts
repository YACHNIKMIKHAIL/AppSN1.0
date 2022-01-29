import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:
        {"API-KEY": "aeb34253-a75e-411a-80ca-6cd2620f759d"}
})

export const usersApi = {
    getUsersApi(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
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
        return instance.post(`follow/${id}`).then(response => {
            return response.data
        })
    }
}

export const authApi={
    authMe () {
        return instance.get(`auth/me`).then(response => {
            return response.data
        })
    }
}

export const profileApi={
    getProfile (userId:number) {
        return instance.get(`profile/ ${userId}`).then(response => {
            return response
        })
    },
    getStatus (userId:number) {
        return instance.get(`profile/status/ ${userId}`).then(response => {
            return response
        })
    },
    updateStatus (status:string) {
        return instance.put(`profile/status`,{status}).then(response => {
            return response
        })
    }
}