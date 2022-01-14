import {ActionsTypes} from "./stote";

type initDataType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
}
const initState: initDataType = {
    id: null,
    email: null,
    login: null,
    isFetching: false
}

const authReducer = (state: initDataType = initState, action: ActionsTypes): initDataType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.data}
        }
        default :
            return state
    }
}

const SET_USER_DATA = 'SET_USER_DATA'
export const setUserDataAC = (id: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA, data: {id, email, login}
    } as const
}


export default authReducer