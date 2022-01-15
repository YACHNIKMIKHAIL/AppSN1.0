import React from 'react';
import {connect} from "react-redux";
import {
    follow, toggleFollowingInProgress,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unFollow,
    UserType
} from "../redux/user-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {usersApi} from "../../API/Api";

type UsersPropsType = {
    users: Array<UserType>
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (usersCount: number) => void
    totalCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
    followingInProgress: boolean
    toggleFollowingInProgress: (followingInProgress: boolean, id: number) => void
    followingId:Array<number>
}

export class UsersComponent extends React.Component<UsersPropsType, Array<UserType>> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersApi.getUsersApi(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalUsersCount(data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersApi.getUsersApi(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
    }

    render() {
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
                   toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                   followingInProgress={this.props.followingInProgress}
                   followingId={this.props.followingId}
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
        followingId:state.usersPage.followingId
    }
}

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingInProgress
})(UsersComponent);

