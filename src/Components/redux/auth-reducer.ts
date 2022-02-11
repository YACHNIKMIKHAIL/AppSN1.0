import {ActionsTypes} from "./stote";
import {authApi, ResultCode} from "../../API/Api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

export type initStateType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
    captchaUrl: string | null
}
const initState: initStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state: initStateType = initState, action: ActionsTypes): initStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        default :
            return state
    }
}

const SET_USER_DATA = 'SET_USER_DATA'
type setAuthUserDataActionPayloadType = {
    id: number | null, email: string | null, login: string | null, isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataActionPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => {
    return {
        type: SET_USER_DATA, payload: {id, email, login, isAuth}
    } as const
}
const GET_CAPTCHA_SUCCESS = 'GET_CAPTCHA_SUCCESS'
type getCaptcoUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_SUCCESS,
    payload: { captchaUrl: string }
}
export const getCaptcoUrlSuccess = (captchaUrl: string): getCaptcoUrlSuccessActionType => {
    return {
        type: GET_CAPTCHA_SUCCESS,
        payload: {captchaUrl}
    }
}

type AuthThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes>
export const authMeThunkCreator = ():AuthThunkType => async (dispatch) => {
    let res = await authApi.authMe()
    if (res.resultCode === ResultCode.Success) {
        let {id, email, login} = res.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const loginThunkCreator = (email: string, password: string, rememberMe?: boolean) => {
    return (dispatch: any) => {
        authApi.login(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === ResultCode.Success) {
                    dispatch(authMeThunkCreator())
                } else {
                    let message = data.messages.length > 0 ? data.messages[0] : ''
                    dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }
}
export const logoutThunkCreator = ():AuthThunkType => {
    return (dispatch) => {
        authApi.logout()
            .then(data => {
                if (data.resultCode === ResultCode.Success) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
    }
}
export default authReducer