import {authMeThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

type initialStateType = {
    initialized: boolean
}
let initialState: initialStateType = {
    initialized: false
}
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
export const appReducer = (state = initialState, action: setInitializedSuccessType): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {...state, initialized: true}
        }
        default :
            return state
    }
}

type setInitializedSuccessType = ReturnType<typeof setInitializedSuccess>
export const setInitializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    } as const
}
type InitializAppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, setInitializedSuccessType>
export const initializAppThunkCreator = (): InitializAppThunkType => async (dispatch) => {
    await dispatch(authMeThunkCreator())
    dispatch(setInitializedSuccess())
}