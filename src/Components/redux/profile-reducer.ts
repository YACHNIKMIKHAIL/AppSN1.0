import {ActionsTypes} from "./stote";


const setUserProfile = 'SET_USER_PROFILE';

type InitialType = {}
let initialState: InitialType = {}

const profileReducer = (state = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case setUserProfile: {
            return {...state,profile:action.profile}
        }
        default :
            return state
    }
}

export const setUserProfileAC = (profile: any) => {
    return {
        type: setUserProfile, profile
    } as const
}


export default profileReducer