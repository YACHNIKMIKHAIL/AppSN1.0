import {instance} from "./Api";

export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/ ${userId}`).then(res => {
            return res.data
        })
    },
    getStatus(userId: number) {
        return instance.get<StatusType>(`profile/status/ ${userId}`).then(response => {
            return response.data
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
export type ProfileType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string,
        large: string
    }
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type StatusType=string