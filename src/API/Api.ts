import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:
        {"API-KEY": "b0713123-338a-4997-b226-9d38b65d5ff4"}
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
    },
    getProfile (userId:number) {
        return instance.get(`profile/ ${userId}`).then(response => {
            return response
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