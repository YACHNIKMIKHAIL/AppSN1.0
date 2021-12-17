import {ActionsTypes, MessagesType, MyFriendsType, MyPostsType} from "./stote";
import img2 from "../Images/avas/images.jpeg";

const sendNewMessage = 'SEND-NEW-MESSAGE';
const updateNewMessageBody = 'UPDATE-NEW-MESSAGE-TEXT';

type initStateType= {
    myFriends:{
        img: string
        id: number
        name: string
        messages: MessagesType
        newMessageBody: string
    }
}
let init_state:initStateType= {
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

const newMessageReducer = (_state=init_state, action: ActionsTypes): initStateType => {
    switch (action.type) {
        case updateNewMessageBody:
            _state.myFriends.newMessageBody = action.body
            return _state
        case sendNewMessage:
            let boby = _state.myFriends.newMessageBody
            _state.myFriends.newMessageBody  = ''
            _state.myFriends.messages.myMess.push({id: 11, title: boby})
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