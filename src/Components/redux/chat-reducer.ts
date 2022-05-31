import {ChatMessageType} from "../../API/ChatApi";
import {InferActionsTypes} from "./reduxStore";


const initState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state: initStateType = initState, action: ChatActionstype): initStateType => {
    switch (action.type) {
        case 'chatReducer/MESSAGES_RECEIVED ': {
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        }
        default :
            return state
    }
}

const chatActions = {
    messagesReceived: (messages: ChatMessageType[]) => {
        return {
            type: 'chatReducer/MESSAGES_RECEIVED ', payload: {messages}
        } as const
    },

}


export const authMeThunkCreator = (): AuthThunkType => async (dispatch) => {
    let res = await authApi.authMe()
    if (res.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = res.data
        dispatch(authActions.setAuthUserData(id, email, login, true))
    }
}


export default chatReducer

export type initStateType = typeof initState
export type ChatActionstype = InferActionsTypes<typeof chatActions>
type AuthThunkType = BaseThunkType<AuthActionstype | FormAction>