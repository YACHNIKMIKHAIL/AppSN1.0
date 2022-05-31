import {chatApi, ChatMessageType, StatusType} from "../../API/ChatApi";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";


const initState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state: initStateType = initState, action: ChatActionsType): initStateType => {
    switch (action.type) {
        case 'chatReducer/MESSAGES_RECEIVED ': {
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        }
        case 'chatReducer/STATUS_CHANGED ': {
            return {...state, status: action.payload.status}
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
    statusChanged: (status: StatusType) => {
        return {
            type: 'chatReducer/STATUS_CHANGED ', payload: {status}
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

let _newStatusHandler: ((status: StatusType) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status: StatusType) => {
            dispatch(chatActions.statusChanged(status))
        }
    }
    return _newStatusHandler
}

export const startMessagesListening = (): AuthThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', newStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = (): AuthThunkType => async (dispatch) => {
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
    chatApi.stop()
}
export const sendMessage = (message: string): AuthThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}


export default chatReducer

export type initStateType = typeof initState
export type ChatActionsType = InferActionsTypes<typeof chatActions>
type AuthThunkType = BaseThunkType<ChatActionsType>