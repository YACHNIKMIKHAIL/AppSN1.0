import {ActionsTypes} from "./stote";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {ResultCodeEnum} from "../../API/Api";
import {Dispatch} from "redux";
import {authApi} from "../../API/AuthApi";
import {securityApi} from "../../API/SecurityApi";

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
        case SET_USER_DATA:
        case GET_CAPTCHA_SUCCESS: {
            return {...state, ...action.payload}
        }
        default :
            return state
    }
}

const SET_USER_DATA = 'authReducer/SET_USER_DATA'
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
const GET_CAPTCHA_SUCCESS = 'authReducer/GET_CAPTCHA_SUCCESS'
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

export const authMeThunkCreator = (): AuthThunkType => async (dispatch) => {
    let res = await authApi.authMe()
    if (res.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = res.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const loginThunkCreator = (email: string, password: string, rememberMe?: boolean, captcha?: string ) => async (dispatch: any) => {
    let data = await authApi.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(authMeThunkCreator())
    } else {
        if (data.resultCode === ResultCodeEnum.Trouble) {
            dispatch(getCaptchaUrlTC())
        }
        let message = data.messages.length > 0 ? data.messages[0] : ''
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logoutThunkCreator = (): AuthThunkType => async (dispatch) => {
    let data = await authApi.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    let data = await securityApi.getCaptchUrl()
    const captchaUrl = data.data.url
    dispatch(getCaptcoUrlSuccess(captchaUrl))
}
export default authReducer