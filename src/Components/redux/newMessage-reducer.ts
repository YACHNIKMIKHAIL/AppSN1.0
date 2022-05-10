import img2 from "../Images/avas/images.jpeg";
import {InferActionsTypes} from "./reduxStore";

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
type initStateType = typeof init_state

const newMessageReducer = (_state = init_state, action: newMessageActionstype): initStateType => {
    switch (action.type) {
        case 'SEND_NEW_MESSAGE': {
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

export const newMessageActions = {
    sendNewMessage: (newMessageBody: string) => {
        return {
            type: 'SEND_NEW_MESSAGE', payload: {newMessageBody}
        } as const
    }
}

export default newMessageReducer

export type newMessageActionstype = InferActionsTypes<typeof newMessageActions>