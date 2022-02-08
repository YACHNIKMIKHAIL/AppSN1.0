import {ActionsTypes} from "./stote";
import {Dispatch} from "redux";
import {authApi} from "../../API/Api";

export type initDataType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
}
const initState: initDataType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
}

const authReducer = (state: initDataType = initState, action: ActionsTypes): initDataType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        default :
            return state
    }
}

const SET_USER_DATA = 'SET_USER_DATA'
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA, payload: {id, email, login, isAuth}
    } as const
}

export const authMeThunkCreator = () => {
    return (dispatch: Dispatch) => {
        authApi.authMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    dispatch(setAuthUserData(id, email, login, true))
                }
            })
    }
}
export const loginThunkCreator = (email: string, password: string, rememberMe?: boolean) => {
    return (dispatch:any) => {
        authApi.login(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(authMeThunkCreator())
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