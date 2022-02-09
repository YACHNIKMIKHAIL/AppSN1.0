import {authMeThunkCreator} from "./auth-reducer";

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
export const initializAppThunkCreator = () => async (dispatch: any) => {
    await dispatch(authMeThunkCreator())
    dispatch(setInitializedSuccess())
}