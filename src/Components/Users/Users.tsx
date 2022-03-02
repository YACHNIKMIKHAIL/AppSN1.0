import React from "react";
import s from './Users.module.css'
import {UserType} from "../redux/user-reducer";
import userPhoto from './../../assets/images/images.png'
import {NavLink} from "react-router-dom";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";


type UsersPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => void
    unFollow: (id: number) => void
    followingInProgress: boolean
    followingId: Array<number>
    unFollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
}
export const Users = ({currentPage, onPageChanged, pageSize, totalCount, ...props}: UsersPropsType) => {
    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={s.content}>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalCount={totalCount}
            />
            <div className={s.users}>
                {props.users?.map((m, i) => {
                    return <User user={m} key={i} followThunkCreator={props.followThunkCreator}
                                 unFollowThunkCreator={props.unFollowThunkCreator} followingId={props.followingId}/>
                })}
            </div>
        </div>

    )
}

