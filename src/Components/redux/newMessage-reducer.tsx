import {ActionsTypes, MyFriendsType} from "./state";

const sendNewMessage = 'SEND-NEW-MESSAGE';
const updateNewMessageBody = 'UPDATE-NEW-MESSAGE-TEXT';

const newMessageReducer = (_state: MyFriendsType, action: ActionsTypes): MyFriendsType => {

    if (action.type === updateNewMessageBody) {
        _state.newMessageBody = action.body
    } else if (action.type === sendNewMessage) {
        let boby = _state.newMessageBody
        _state.newMessageBody = ''
        _state.messages.myMess.push({id: 11, title: boby})
    }
    return _state
}

export default newMessageReducer