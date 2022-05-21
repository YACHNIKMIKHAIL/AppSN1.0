import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {
    FilterType,
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
    getTotalCount, getUsersFilter,
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
    filter: FilterType
}
type MapDispatchPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingInProgress: (followingInProgress: boolean, id: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number, filter: FilterType) => void
    onPageChangedThunkCreator: (pageNumber: number, pageSize: number, filter: FilterType) => void
    unFollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
}
type OwnPropsType = {
    pageTitle?: string
}
type UsersPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

export class UsersComponent extends React.Component<UsersPropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props
        this.props.getUsersThunkCreator(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.onPageChangedThunkCreator(pageNumber, pageSize, filter)
        // this.props.getUsersThunkCreator(pageNumber, pageSize, filter.term)
    }
    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsersThunkCreator(1, pageSize, filter)
    }

    render() {
        return <div style={{display: 'flex', flexDirection: 'column'}}>
            {this.props.pageTitle && <h2>{this.props.pageTitle}</h2>}
            {this.props.isFetching
                ? <Preloader/>
                : null
            }
            <Users
                // totalCount={this.props.totalCount}
                //    pageSize={this.props.pageSize}
                //    currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                // users={this.props.users}
                // follow={this.props.follow}
                // unFollow={this.props.unFollow}
                // followingInProgress={this.props.followingInProgress}
                // followingId={this.props.followingId}
                unFollowThunkCreator={this.props.unFollowThunkCreator}
                followThunkCreator={this.props.followThunkCreator}
                onFilterChanged={this.onFilterChanged}
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
        followingId: getFollowingId(state),
        filter: getUsersFilter(state)
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



type UsersPagePropsType = {
    pageTitle?:string
}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const dispatch = useDispatch()
    const pageSize=useSelector<AppStateType,number>(state=>state.usersPage.pageSize)
    const filter=useSelector<AppStateType,FilterType>(state=>state.usersPage.filter)
    const isFetching=useSelector<AppStateType,boolean>(state=>state.usersPage.isFetching)
    const currentPage=useSelector<AppStateType,number>(state=>state.usersPage.currentPage)

    const onPageChanged = (pageNumber: number) => {
        dispatch(onPageChangedThunkCreator(pageNumber, pageSize, filter))
    }
    const unFollowFunc = (id: number) => {
        dispatch(unFollowThunkCreator(id))
    }
    const followFunc = (id: number) => {
        dispatch(followThunkCreator(id))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }

    useEffect(()=>{
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    },[])
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        {props.pageTitle && <h2>{props.pageTitle}</h2>}
        {isFetching
            ? <Preloader/>
            : null
        }
        <Users
            onPageChanged={onPageChanged}
            unFollowThunkCreator={unFollowFunc}
            followThunkCreator={followFunc}
            onFilterChanged={onFilterChanged}
        />
    </div>
}

