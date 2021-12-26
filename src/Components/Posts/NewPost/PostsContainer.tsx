import React from "react";
import {Posts} from "../Posts";
import {addPostAC, UpdateNewPostTextAC} from "../../redux/newPost-reducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/reduxStore";

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