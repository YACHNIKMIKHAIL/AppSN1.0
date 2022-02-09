import {ActionsTypes} from "./stote";
import {Dispatch} from "redux";
import {authApi} from "../../API/Api";
import {stopSubmit} from "redux-form";

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


export const authMeThunkCreator = () => async (dispatch: Dispatch) => {
    let res = await authApi.authMe()
    if (res.resultCode === 0) {
        let {id, email, login} = res.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const loginThunkCreator = (email: string, password: string, rememberMe?: boolean) => {
    return (dispatch: any) => {
        authApi.login(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(authMeThunkCreator())
                } else {
                    let message = data.messages.length > 0 ? data.messages[0] : ''
                    dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }
}
export const logoutThunkCreator = () => {
    return (dispatch: Dispatch) => {
        authApi.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
    }
}
export default authReducer