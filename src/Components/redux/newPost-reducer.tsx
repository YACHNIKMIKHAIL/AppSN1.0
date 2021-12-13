import {ActionsTypes, MyPostsType, StateType} from "./state";

const addPost = 'ADD-POST';
const updateNewPostText = 'UPDATE-NEW-POST-TEXT';

const newPostReducer = (_state: StateType, action: ActionsTypes): StateType => {
    switch (action.type) {
        case addPost:
            let newPost: MyPostsType = {
                date: new Date().getTime(),
                id: 4,
                text: _state.newPostText,
                likecount: 0
            }
            _state.myPosts.push(newPost)
            _state.newPostText = ''
            return _state
        case updateNewPostText:
            _state.newPostText = action.newText
            return _state

        default :
            return _state
    }
}

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export const UpdateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}

export default newPostReducer