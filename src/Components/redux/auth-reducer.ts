import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {ResultCodeEnum} from "../../API/Api";
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


export const authMeThunkCreator = (): AuthThunkType => async (dispatch) => {
    let res = await authApi.authMe()
    if (res.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = res.data
        dispatch(authActions.setAuthUserData(id, email, login, true))
    }
}
export const loginThunkCreator = (email: string, password: string, rememberMe?: boolean, captcha?: string): AuthThunkType => async (dispatch) => {
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

export const getCaptchaUrlTC = (): AuthThunkType => async (dispatch) => {
    let data = await securityApi.getCaptchUrl()
    const captchaUrl = data.url
    dispatch(authActions.getCaptcoUrlSuccess(captchaUrl))
}
export default authReducer

export type initStateType = typeof initState
export type AuthActionstype = InferActionsTypes<typeof authActions>
type AuthThunkType = BaseThunkType<AuthActionstype | FormAction>