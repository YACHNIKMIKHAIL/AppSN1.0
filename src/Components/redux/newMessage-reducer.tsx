import {ActionsTypes, MyPostsType, StateType} from "./state";
import newPostReducer from "./newPost-reducer";

const sendNewMessage = 'SEND-NEW-MESSAGE';
const updateNewMessageBody = 'UPDATE-NEW-MESSAGE-TEXT';

 const newMessageReducer=(_state:any,action:ActionsTypes)=>{

    if (action.type === updateNewMessageBody) {
        _state.myFriends.newMessageBody = action.body
    } else if (action.type === sendNewMessage) {
        let boby = _state.myFriends.newMessageBody
        _state.newMessageBody = ''
        _state.messages.myFriends.push({id: 11, title: boby})
    }
    return _state
}

export default newMessageReducer