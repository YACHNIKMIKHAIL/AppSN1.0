import {ActionsTypes, MessagesType} from "./stote";
import img2 from "../Images/avas/images.jpeg";

type initStateType = {
    myFriends: {
        img: string
        id: number
        name: string
        messages: MessagesType
        newMessageBody: string
    }
}
let init_state = {
    myFriends:
        {
            img: img2,
            id: 1,
            name: 'Vitalya',
            messages: {
                myMess: [
                    {id: 1, title: '1 not working due to missing reference to NvModuleTracker'}
                ],
                friendMess: [
                    {id: 2, title: '2 not working due to missing reference to NvModuleTracker'}
                ],
            },
            newMessageBody: ''
        }
}
// type initStateType = typeof init_state
const newMessageReducer = (_state = init_state, action: ActionsTypes): initStateType => {
    switch (action.type) {
        case SEND_NEW_MESSAGE: {
            let boby = action.payload.newMessageBody
            return {
                ..._state,
                myFriends: {
                    ..._state.myFriends,
                    messages: {
                        ..._state.myFriends.messages,
                        myMess: [..._state.myFriends.messages.myMess, {id: 11, title: boby}]
                    }
                }
            }
        }

        default :
            return _state
    }
}
const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE'
type sendNewMessageACType = {
    type: typeof SEND_NEW_MESSAGE,
    payload: { newMessageBody: string }
}
export const sendNewMessageAC = (newMessageBody: string): sendNewMessageACType => {
    return {
        type: 'SEND_NEW_MESSAGE', payload: {newMessageBody}
    } as const
}

export default newMessageReducer