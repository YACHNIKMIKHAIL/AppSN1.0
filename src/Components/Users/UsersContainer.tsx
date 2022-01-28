import React from 'react';
import {connect} from "react-redux";
import {
    followSuccess,
    followThunkCreator,
    getUsersThunkCreator,
    onPageChangedThunkCreator,
    setCurrentPage,
    toggleFollowingInProgress,
    unFollowSuccess,
    unFollowThunkCreator,
    UserType
} from "../redux/user-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {WithAuthRedirect} from "../Hoc/WithAuthRedirect";
import {compose} from "redux";

type UsersPropsType = {
    users: Array<UserType>
    follow: (id: number) => void
    unFollow: (id: number) => void
    setCurrentPage: (pageNumber: number) => void
    totalCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: boolean
    toggleFollowingInProgress: (followingInProgress: boolean, id: number) => void
    followingId: Array<number>
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    onPageChangedThunkCreator: (pageNumber: number, pageSize: number) => void
    unFollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
    // isAuth:boolean
}

export class UsersComponent extends React.Component<UsersPropsType, Array<UserType>> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.onPageChangedThunkCreator(pageNumber, this.props.pageSize)
    }

    render() {
        // if (!this.props.isAuth) {
        //     return <Navigate to={"/login"}/>
        // }else {
        return <div style={{display: 'flex', flexDirection: 'column'}}>
            {this.props.isFetching
                ? <Preloader/>
                : null
            }
            <Users totalCount={this.props.totalCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   followingInProgress={this.props.followingInProgress}
                   followingId={this.props.followingId}
                   unFollowThunkCreator={this.props.unFollowThunkCreator}
                   followThunkCreator={this.props.followThunkCreator}
            />
        </div>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        followingId: state.usersPage.followingId,
        // isAuth: state.auth.isAuth
    }
}


export default compose(
    connect(mapStateToProps, {
        follow: followSuccess,
        unFollow: unFollowSuccess,
        setCurrentPage,
        toggleFollowingInProgress,
        getUsersThunkCreator,
        onPageChangedThunkCreator,
        unFollowThunkCreator,
        followThunkCreator,
    }),
    WithAuthRedirect
)(UsersComponent)

