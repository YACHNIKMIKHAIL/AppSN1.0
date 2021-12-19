import React from "react";
import {Posts} from "../Posts";
import {addPostAC, UpdateNewPostTextAC} from "../../redux/newPost-reducer";
import {AppStateType, StoreType} from "../../redux/reduxStore";
import {Dispatch} from "redux";
import StoreContext from "../../../StoreContext";


type PostsContainerPropsType = {
    // state: AppStateType,
    // dispatch: Dispatch

    // myPosts: Array<MyPostsType>
    // newPostText: string
    // dispatch: (action: any) => void

    // updateNewPost:(newText:string)=>void
    // addPost: (text:string) => void
}


export const PostsContainer = (props: PostsContainerPropsType) => {

    //let state = props.store.getState()
    let addPosts = () => {
        // props.dispatch(addPostAC())
    }
    let onPostChange = (newText: string) => {
        // props.dispatch(UpdateNewPostTextAC(newText))
        console.log(newText)
    }
    return (
        <>
        <StoreContext.Consumer>
            {(store)=><Posts
                myPosts={store.getState().myPosts.myPosts} newPostText={store.getState().myPosts.newPostText}
                updateNewPost={onPostChange}
                addPost={addPosts}
            />}
        </StoreContext.Consumer>
        </>
    )
}

