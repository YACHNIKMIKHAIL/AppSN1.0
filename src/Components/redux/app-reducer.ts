import {authMeThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";

let initialState = {
    initialized: false
}

type initialStateType = typeof initialState


export const appReducer = (state = initialState, action: AppActionstype): initialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS': {
            return {...state, initialized: true}
        }
        default :
            return state
    }
}

export type AppActionstype = InferActionsTypes<typeof appActions>

export const appActions = {
    setInitializedSuccess: () => {
        return {
            type: 'SN/APP/INITIALIZED_SUCCESS'
        } as const
    }
}

type InitializAppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionstype>

export const initializAppThunkCreator = (): InitializAppThunkType => async (dispatch) => {
    await dispatch(authMeThunkCreator())
    dispatch(appActions.setInitializedSuccess())
}