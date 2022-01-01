import React from 'react';
import {Users} from "./Users";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unFollowAC,
    UserType
} from "../redux/user-reducer";
import {AppStateType} from "../redux/reduxStore";
import {UsersClass} from "./UsersClass";

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage
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
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (usersCount: number) => {
            dispatch(setTotalUsersCountAC(usersCount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersClass);

