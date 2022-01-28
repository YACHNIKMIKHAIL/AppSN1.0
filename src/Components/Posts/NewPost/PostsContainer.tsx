import {Posts} from "../Posts";
import {addPostAC, UpdateNewPostTextAC} from "../../redux/newPost-reducer";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/reduxStore";
import {WithAuthRedirect} from "../../Hoc/WithAuthRedirect";
import React from "react";
import {
    followSuccess, followThunkCreator,
    getUsersThunkCreator, onPageChangedThunkCreator,
    setCurrentPage,
    toggleFollowingInProgress,
    unFollowSuccess, unFollowThunkCreator
} from "../../redux/user-reducer";
import {UsersComponent} from "../../Users/UsersContainer";


const mapStateToProps = (state: AppStateType) => {
    return {
        myPosts: state.myPosts.myPosts,
        newPostText: state.myPosts.newPostText,
        // isAuth:state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewPost: (newText: string) => {
            dispatch(UpdateNewPostTextAC(newText))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}
compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Posts)

export const PostsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Posts)