import React from 'react';
import {Users} from "./Users";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unFollowAC, UserType} from "../redux/user-reducer";
import {AppStateType} from "../redux/reduxStore";
import {UsersClass} from "./UsersClass";

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (id: number) => {
            dispatch(followAC(id))
        },
        unFollow: (id: number) => {
            dispatch(unFollowAC(id))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersClass);

