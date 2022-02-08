import {ActionsTypes} from "./stote";
import {Dispatch} from "redux";
import {profileApi} from "../../API/Api";

type ContactsType = {
    facebook: string,
    website: null,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: null,
    github: string,
    mainLink: null
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

export type InitialProfileType = {
    profile: ProfileType
    status: string
}
let initialProfileState: InitialProfileType = {
    profile: {} as ProfileType,
    status: ''
}

const profileReducer = (state = initialProfileState, action: ActionsTypes): InitialProfileType => {
    switch (action.type) {
        case setUserProfile: {
            return {...state, profile: action.profile}
        }
        case getStatus: {
            return {...state, status: action.status}
        }
        case setStatus: {
            return {...state, status: action.status}
        }
        case updateStatus: {
            return {...state, status: action.status}
        }
        default :
            return state
    }
}
const setUserProfile = 'SET_USER_PROFILE';
const getStatus = 'GET_STATUS';
const setStatus = 'SET_STATUS';
const updateStatus = 'UPDATE_STATUS';

type setUserProfileACType={
    type: typeof setUserProfile,
    profile: ProfileType
}
export const setUserProfileAC = (profile: ProfileType):setUserProfileACType => {
    return {
        type: setUserProfile, profile
    } as const
}
type getStatusACType={
    type: typeof getStatus,
    status: string
}
export const getStatusAC = (status: string):getStatusACType => {
    return {
        type: getStatus, status
    } as const
}
type setStatusACType={
    type: typeof setStatus,
    status: string
}
export const setStatusAC = (status: string):setStatusACType => {
    return {
        type: setStatus, status
    } as const
}
type updateStatusACACType={
    type: typeof updateStatus,
    status: string
}
export const updateStatusAC = (status: string):updateStatusACACType => {
    return {
        type: updateStatus, status
    } as const
}


export const getProfileThunkCreator = (userId: number) => {
    return (dispatch: Dispatch) => {
        profileApi.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.data))
            })
    }
}
export const getStatusThunkCreator = (userId: number) => {
    return (dispatch: Dispatch) => {
        profileApi.getStatus(userId)
            .then(response => {
                dispatch(getStatusAC(response.data))
            })
    }
}
export const updateStatusThunkCreator = (status: string) => {
    return (dispatch: Dispatch) => {
        profileApi.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatusAC(status))
                }
            })
    }
}


export default profileReducer