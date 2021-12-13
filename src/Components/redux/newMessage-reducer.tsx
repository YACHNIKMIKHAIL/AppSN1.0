import {ActionsTypes, MyPostsType, StateType} from "./state";
import newPostReducer from "./newPost-reducer";

const sendNewMessage = 'SEND-NEW-MESSAGE';
const updateNewMessageBody = 'UPDATE-NEW-MESSAGE-TEXT';

 const newMessageReducer=(state:any,action:ActionsTypes)=>{

    if (action.type === updateNewMessageBody) {
        state.myFriends.newMessageBody = action.body
    } else if (action.type === sendNewMessage) {
        let boby = state.myFriends.newMessageBody
        state.newMessageBody = ''
        state.messages.myFriends.push({id: 11, title: boby})
    }
    return state
}

export default newMessageReducer