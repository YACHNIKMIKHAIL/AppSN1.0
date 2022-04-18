import {ProfileType} from "../Components/redux/profile-reducer";
import {instance} from "./Api";

export const profileApi = {
    getProfile(userId: number) {
        return instance.get(`profile/ ${userId}`).then(response => {
            return response
        })
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/ ${userId}`).then(response => {
            return response
        })
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status}).then(response => {
            return response
        })
    },
    updatePhoto(newPhoto: any) {
        const formData = new FormData()
        formData.append('image', newPhoto)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response
        })
    },
    updateProfile(profile: ProfileType) {
        return instance.put(`/profile`, profile)
            .then(response => {
                return response
            })
    }
}