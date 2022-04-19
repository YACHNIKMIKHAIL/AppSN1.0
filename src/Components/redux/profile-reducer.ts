import {ActionsTypes} from "./stote";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./reduxStore";
import {FormAction, stopSubmit} from "redux-form";
import {profileApi, ProfileType} from "../../API/ProfileApi";

let initialProfileState = {
    profile: {} as ProfileType,
    status: ''
}

const profileReducer = (state = initialProfileState, action: ProfileActionsType): InitialProfileType => {
    switch (action.type) {
        case 'profileReducer/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'profileReducer/GET_STATUS': {
            return {...state, status: action.status}
        }
        case 'profileReducer/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'profileReducer/UPDATE_STATUS': {
            return {...state, status: action.status}
        }
        case 'profileReducer/savePhotoSuccessAC': {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default :
            return state
    }
}

export const profileActions = {
    setUserProfileAC: (profile: ProfileType) => {
        return {
            type: 'profileReducer/SET_USER_PROFILE', profile
        } as const
    },
    getStatusAC: (status: string) => {
        return {
            type: 'profileReducer/GET_STATUS', status
        } as const
    },
    setStatusAC: (status: string) => {
        return {
            type: 'profileReducer/SET_STATUS', status
        } as const
    },
    updateStatusAC: (status: string) => {
        return {
            type: 'profileReducer/UPDATE_STATUS', status
        } as const
    },
    savePhotoSuccessAC: (photos: { large: string, small: string }) => {
        return {
            type: 'profileReducer/savePhotoSuccessAC', photos
        } as const
    }
}


export const getProfileThunkCreator = (userId: number): ProfileThunkType => async (dispatch) => {
    let response = await profileApi.getProfile(userId)
    dispatch(profileActions.setUserProfileAC(response))
}
export const getStatusThunkCreator = (userId: number): ProfileThunkType => async (dispatch) => {
    let response = await profileApi.getStatus(userId)
    dispatch(profileActions.getStatusAC(response))
}
export const updateStatusThunkCreator = (status: string): ProfileThunkType => async (dispatch) => {
    try {
        let response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(profileActions.setStatusAC(status))
        }
    } catch (e) {
        alert(e)
    }
}

export const savePhotoThunkCreator = (newPhoto: File): ProfileThunkType => async (dispatch) => {

    let response = await profileApi.updatePhoto(newPhoto)
    if (response.data.resultCode === 0) {
        dispatch(profileActions.savePhotoSuccessAC(response.data.data))
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

export type InitialProfileType = typeof initialProfileState
export type ProfileActionsType = InferActionsTypes<typeof profileActions>
type ProfileThunkType = BaseThunkType<ProfileActionsType | FormAction>