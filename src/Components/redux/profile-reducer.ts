import {ActionsTypes} from "./stote";
import {Dispatch} from "redux";
import {profileApi} from "../../API/Api";

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
let initialProfileState: InitialProfileType  = {
    profile: {

    } as ProfileType
        // {
        //     aboutMe: '',
        //     contacts: {
        //         facebook: '',
        //         website: null,
        //         vk: '',
        //         twitter: '',
        //         instagram: '',
        //         youtube: null,
        //         github: '',
        //         mainLink: null
        //     },
        //     lookingForAJob: false,
        //     lookingForAJobDescription: '',
        //     fullName: '',
        //     userId: 0,
        //     photos: {
        //         small: '',
        //         large: ''
        //     }
        // }
}

const profileReducer = (state = initialProfileState, action: ActionsTypes): InitialProfileType  => {
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

export const getProfileThunkCreator=(userId:number)=>{
    return (dispatch:Dispatch)=>{
        debugger
        profileApi.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.data))
            })
    }
}


export default profileReducer