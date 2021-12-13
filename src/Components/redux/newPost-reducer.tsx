import {ActionsTypes, MyPostsType, StateType, StoreType} from "./state";

const addPost = 'ADD-POST';
const updateNewPostText = 'UPDATE-NEW-POST-TEXT';

 const newPostReducer = (_state:StateType,action:ActionsTypes): StateType => {

    if (action.type === addPost) {
        let newPost: MyPostsType = {
            date: new Date().getTime(),
            id: 4,
            text: _state.newPostText,
            likecount: 0
        }
        _state.myPosts.push(newPost)
        _state.newPostText = ''
        // state._callSubsriber({State: state})
    } else if (action.type === updateNewPostText) {
        _state.newPostText = action.newText
        // state._callSubsriber({State: state})
}
    return _state
}

export default newPostReducer