import {ActionsTypes} from "./stote";
import {Dispatch} from "redux";
import {profileApi, usersApi} from "../../API/Api";

const setUserProfile = 'SET_USER_PROFILE';

export type ProfileType = {
    aboutMe: string,
    contacts: {
        facebook: string,
        website: null,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: null,
        github: string,
        mainLink: null
    },
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
}
let initialProfileState: InitialProfileType = {
    profile: {} as ProfileType
}

const profileReducer = (state = initialProfileState, action: ActionsTypes): InitialProfileType => {
    switch (action.type) {
        case setUserProfile: {
            return {...state, profile: action.profile}
        }
        default :
            return state
    }
}

export const setUserProfileAC = (profile: ProfileType) => {
    return {
        type: setUserProfile, profile
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


export default profileReducer