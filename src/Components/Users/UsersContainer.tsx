import React from 'react';
import {connect} from "react-redux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    onPageChangedThunkCreator,
    unFollowThunkCreator, usersActions
} from "../redux/user-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {WithAuthRedirect} from "../Hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingId,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalCount,
    getUsersSuperSelector
} from "../redux/users-selectors";
import {UserType} from "../../API/UsersApi";

type MapStatePropsType = {
    users: Array<UserType>
    totalCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: boolean
    followingId: Array<number>
}
type MapDispatchPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingInProgress: (followingInProgress: boolean, id: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number, term: string) => void
    onPageChangedThunkCreator: (pageNumber: number, pageSize: number) => void
    unFollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
}
type OwnPropsType = {
    pageTitle?: string
}
type UsersPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

export class UsersComponent extends React.Component<UsersPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersThunkCreator(currentPage, pageSize, '')
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.onPageChangedThunkCreator(pageNumber, pageSize)
        // this.props.getUsersThunkCreator(pageNumber, pageSize, '')

    }

    render() {
        return <div style={{display: 'flex', flexDirection: 'column'}}>
            {this.props.pageTitle && <h2>{this.props.pageTitle}</h2>}
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        followingId: getFollowingId(state)
    }
}

export default compose<React.ComponentType<OwnPropsType>>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow: usersActions.followSuccess,
        unFollow: usersActions.unFollowSuccess,
        setCurrentPage: usersActions.setCurrentPage,
        toggleFollowingInProgress: usersActions.toggleFollowingInProgress,
        getUsersThunkCreator,
        onPageChangedThunkCreator,
        unFollowThunkCreator,
        followThunkCreator,
    }),
    WithAuthRedirect
)(UsersComponent)

