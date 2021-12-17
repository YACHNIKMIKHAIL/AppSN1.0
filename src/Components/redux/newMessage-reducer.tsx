import {ActionsTypes, MyFriendsType, MyPostsType} from "./stote";

const sendNewMessage = 'SEND-NEW-MESSAGE';
const updateNewMessageBody = 'UPDATE-NEW-MESSAGE-TEXT';

const newMessageReducer = (_state: MyFriendsType, action: ActionsTypes): MyFriendsType => {
    switch (action.type) {
        case updateNewMessageBody:
            _state.newMessageBody = action.body
            return _state
        case sendNewMessage:
            let boby = _state.newMessageBody
            _state.newMessageBody = ''
            _state.messages.myMess.push({id: 11, title: boby})
            return _state

        default :
            return _state
    }
}

export const updateNewMessageBodyAC = (body: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        body: body
    } as const
}

export const sendNewMessageAC = () => {
    return {
        type: 'SEND-NEW-MESSAGE'
    } as const
}

export default newMessageReducer