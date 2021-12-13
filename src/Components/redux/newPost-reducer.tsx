import {ActionsTypes, MyPostsType, StateType, StoreType} from "./state";

const addPost = 'ADD-POST';
const updateNewPostText = 'UPDATE-NEW-POST-TEXT';

 const newPostReducer = (state:any,action:ActionsTypes) => {

    if (action.type === addPost) {
        let newPost: MyPostsType = {
            date: new Date().getTime(),
            id: new Date().getTime(),
            text: state.newPostText,
            likecount: 0
        }
        state.myPosts.push(newPost)
        state.newPostText = ''
        // state._callSubsriber({State: state})
    } else if (action.type === updateNewPostText) {
        state.newPostText = action.newText
        // state._callSubsriber({State: state})
}
    return state
}

export default newPostReducer