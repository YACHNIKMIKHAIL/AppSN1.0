import {authMeThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {PhotosType} from "../../API/ProfileApi";

let initialState = {
    name: null as null | string,
    photo: null as null | PhotosType
}

export type initialOpponentType = typeof initialState


export const gameReducer = (state = initialState, action: gameActionstype): initialOpponentType => {
    switch (action.type) {
        case 'GAME/addOpponent': {
            return action.payload
        }
        default :
            return state
    }
}

export type gameActionstype = InferActionsTypes<typeof gameActions>

export const gameActions = {
    addOpponent: (name: null | string, photo: null | PhotosType) => {
        return {
            type: 'GAME/addOpponent', payload: {name, photo}
        } as const
    }
}
