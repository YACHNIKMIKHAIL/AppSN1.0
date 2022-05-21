import React from "react";
import s from './Users.module.css'
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";
import {UserSearchForm} from "./UsersSearchForm";
import {FilterType} from "../redux/user-reducer";
import {useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingId,
    getFollowingInProgress,
    getPageSize,
    getTotalCount,
    getUsersSuperSelector
} from "../redux/users-selectors";


type UsersPropsType = {
    // totalCount: number
    // pageSize: number
    // currentPage: number
    onPageChanged: (pageNumber: number) => void
    // users: Array<UserType>
    // follow: (id: number) => void
    // unFollow: (id: number) => void
    // followingInProgress: boolean
    // followingId: Array<number>
    unFollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
    onFilterChanged: (filter: FilterType) => void
}
export const Users = ({onPageChanged, onFilterChanged, ...props}: UsersPropsType) => {
    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsersSuperSelector)
    const followingInProgress = useSelector(getFollowingInProgress)
    const followingId = useSelector(getFollowingId)


    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={s.content}>
            <UserSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalCount={totalCount}
            />
            <div className={s.users}>
                {users?.map((m, i) => {
                    return <User
                        user={m}
                        key={i}
                        followThunkCreator={props.followThunkCreator}
                        unFollowThunkCreator={props.unFollowThunkCreator}
                        followingId={followingId}/>
                })}
            </div>
        </div>

    )
}