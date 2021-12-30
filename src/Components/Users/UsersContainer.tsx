import React from 'react';
import {Users} from "./Users";
import {connect} from "react-redux";
import {StateType} from "../redux/stote";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unFollowAC, UserType} from "../redux/user-reducer";

export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    users: Array<UserType>
}
const mapStateToProps = (state: StateType) => {

    return {
        users: state.users
    }
}

type mapDispatchToPropsType = {
    followAC: (id: number) => void
    unFollowAC: (id: number) => void
    setUsersAC: (users: Array<UserType>) => void
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        followAC: (id: number) => {
            dispatch(followAC(id))
        },
        unFollowAC: (id: number) => {
            dispatch(unFollowAC(id))
        },
        setUsersAC: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

