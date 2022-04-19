import {ActionsTypes} from "./stote";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {FormAction, stopSubmit} from "redux-form";
import {profileApi, ProfileType} from "../../API/ProfileApi";

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
        case savePhotoSuccess: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default :
            return state
    }
}
const setUserProfile = 'profileReducer/SET_USER_PROFILE';
const getStatus = 'profileReducer/GET_STATUS';
const setStatus = 'profileReducer/SET_STATUS';
const updateStatus = 'profileReducer/UPDATE_STATUS';
const savePhotoSuccess = 'profileReducer/savePhotoSuccessAC';

type setUserProfileACType = {
    type: typeof setUserProfile,
    profile: ProfileType,
}
export const setUserProfileAC = (profile: ProfileType): setUserProfileACType => {
    return {
        type: setUserProfile, profile
    } as const
}
type getStatusACType = {
    type: typeof getStatus,
    status: string
}
export const getStatusAC = (status: string): getStatusACType => {
    return {
        type: getStatus, status
    } as const
}
type setStatusACType = {
    type: typeof setStatus,
    status: string
}
export const setStatusAC = (status: string): setStatusACType => {
    return {
        type: setStatus, status
    } as const
}
type updateStatusACACType = {
    type: typeof updateStatus,
    status: string
}
export const updateStatusAC = (status: string): updateStatusACACType => {
    return {
        type: updateStatus, status
    } as const
}

type savePhotoSuccessACType = {
    type: typeof savePhotoSuccess,
    photos: { large: string, small: string }
}
export const savePhotoSuccessAC = (photos: { large: string, small: string }): savePhotoSuccessACType => {
    return {
        type: savePhotoSuccess, photos
    } as const
}

type ProfileThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes | FormAction>

export const getProfileThunkCreator = (userId: number): ProfileThunkType => async (dispatch) => {
    let response = await profileApi.getProfile(userId)
    dispatch(setUserProfileAC(response))
}
export const getStatusThunkCreator = (userId: number): ProfileThunkType => async (dispatch) => {
    let response = await profileApi.getStatus(userId)
    dispatch(getStatusAC(response))
}
export const updateStatusThunkCreator = (status: string): ProfileThunkType => async (dispatch) => {
    try {
        let response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    } catch (e) {
        alert(e)
    }
}

export const savePhotoThunkCreator = (newPhoto: File): ProfileThunkType => async (dispatch, getState) => {
    const myId = getState().profile.profile.userId

    let response = await profileApi.updatePhoto(newPhoto)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data))
        // dispatch(getProfileThunkCreator(myId))
    }
}
export const saveProfileThunkCreator = (profile: ProfileType) /*: ThunkResult<Promise<boolean>>*/ =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes | FormAction>, getState: () => AppStateType) => {
        const userId = getState().profile.profile.userId
        let response = await profileApi.updateProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getProfileThunkCreator(userId))
            return true
        } else {
            dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }
    }

export default profileReducer