import {chatApi, ChatMessageType} from "../../API/ChatApi";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";


const initState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state: initStateType = initState, action: ChatActionsType): initStateType => {
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
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(chatActions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
export const startMessagesListening = (): AuthThunkType => async (dispatch) => {
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): AuthThunkType => async (dispatch) => {
    chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
}


export default chatReducer

export type initStateType = typeof initState
export type ChatActionsType = InferActionsTypes<typeof chatActions>
type AuthThunkType = BaseThunkType<ChatActionsType>