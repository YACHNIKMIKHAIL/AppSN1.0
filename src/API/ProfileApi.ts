import {instance, ApiRespType} from "./Api";

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
        return instance.put<ApiRespType>(`profile/status`, {status}).then(response => {
            return response
        })
    },
    updatePhoto(newPhoto: File) {
        const formData = new FormData()
        formData.append('image', newPhoto)
        return instance.put<ApiRespType<PhotosType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response
        })
    },
    updateProfile(profile: ProfileType) {
        return instance.put<ApiRespType>(`/profile`, profile)
            .then(response => {
                return response
            })
    }
}
 type PhotosType={
    small: string,
    large: string
}
export type ProfileType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
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