import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes, ThunkType} from "./reduxStore";
import {ResultCodeEnum} from "../../API/Api";
import {Dispatch} from "redux";
import {authApi} from "../../API/AuthApi";
import {securityApi} from "../../API/SecurityApi";

const initState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
}
export type initStateType = typeof initState

const authReducer = (state: initStateType = initState, action: AuthActionstype): initStateType => {
    switch (action.type) {
        case 'authReducer/SET_USER_DATA':
        case 'authReducer/GET_CAPTCHA_SUCCESS': {
            return {...state, ...action.payload}
        }
        default :
            return state
    }
}
export type AuthActionstype = InferActionsTypes<typeof authActions>

const authActions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {
            type: 'authReducer/SET_USER_DATA', payload: {id, email, login, isAuth}
        } as const
    },
    getCaptcoUrlSuccess: (captchaUrl: string) => {
        return {
            type: 'authReducer/GET_CAPTCHA_SUCCESS',
            payload: {captchaUrl}
        } as const
    }
}


type AuthThunkType = ThunkType<AuthActionstype>

export const authMeThunkCreator = (): AuthThunkType => async (dispatch) => {
    let res = await authApi.authMe()
    if (res.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = res.data
        dispatch(authActions.setAuthUserData(id, email, login, true))
    }
}
export const loginThunkCreator = (email: string, password: string, rememberMe?: boolean, captcha?: string) => async (dispatch: any) => {
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
        dispatch(authActions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    let data = await securityApi.getCaptchUrl()
    const captchaUrl = data.url
    dispatch(authActions.getCaptcoUrlSuccess(captchaUrl))
}
export default authReducer