import React from "react";
import {Posts} from "../Posts";
import {addPostAC, UpdateNewPostTextAC} from "../../redux/newPost-reducer";
import {connect} from "react-redux";
import {MyFriendsType, MyPostsType, StateType} from "../../redux/stote";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/reduxStore";


// type PostsContainerPropsType = {
//     // state: AppStateType,
//     // dispatch: Dispatch
//
//     // myPosts: Array<MyPostsType>
//     // newPostText: string
//     // dispatch: (action: any) => void
//
//     // updateNewPost:(newText:string)=>void
//     // addPost: (text:string) => void
// }
//
//
// export const PostsContainer = (props: PostsContainerPropsType) => {
//
//     return (
//         <>
//         <StoreContext.Consumer>
//             {(store)=> {
//                 let addPosts = () => {
//                     // props.dispatch(addPostAC())
//                 }
//                 let onPostChange = (newText: string) => {
//                     // props.dispatch(UpdateNewPostTextAC(newText))
//                     console.log(newText)
//                 }
//
//                 return <Posts
//                     myPosts={store.getState().myPosts.myPosts} newPostText={store.getState().myPosts.newPostText}
//                     updateNewPost={onPostChange}
//                     addPost={addPosts}
//                 />
//             }}
//         </StoreContext.Consumer>
//         </>
//     )
// }


const mapStateToProps = (state:AppStateType) => {
    return {
        myPosts: state.myPosts.myPosts,
        newPostText: state.myPosts.newPostText
    }
}
const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        updateNewPost: (newText: string) => {
            dispatch(UpdateNewPostTextAC(newText))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}

export const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts)