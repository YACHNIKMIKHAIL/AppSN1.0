import {Posts} from "../Posts";
import {addPostAC} from "../../redux/newPost-reducer";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/reduxStore";
import {WithAuthRedirect} from "../../Hoc/WithAuthRedirect";
import React from "react";


const mapStateToProps = (state: AppStateType) => {
    return {
        myPosts: state.myPosts.myPosts,
        // newPostText: state.myPosts.newPostText,
        // isAuth:state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText:string) => {
            dispatch(addPostAC(newPostText))
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