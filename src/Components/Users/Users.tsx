import React from "react";
import s from './Users.module.css'
import {UserType} from "../redux/user-reducer";
import userPhoto from './../../assets/images/images.png'
import {Navigate, NavLink} from "react-router-dom";


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
export const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={s.content}>
            <div className={s.pages}>{pages.map(p => {
                return <span onClick={() => {
                    props.onPageChanged(p)
                }} className={props.currentPage === p ? s.selected : ''}>-{p}-</span>
            })}
            </div>
            <div className={s.users}>
                {props.users?.map(m => {
                    return <div key={m.id} className={s.u}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + m.id}>
                            <img src={m.photos.small !== null ? m.photos.small : userPhoto}
                                 alt={'fsgf'}/>
                            </NavLink>
                        </div>
                        <div>
                            <div style={m.followed ? {color: 'yellow'} : {color: 'red'}}>
                                {m.followed ? 'FOLOWED' : "UNFOLOWED"}</div>

                            {m.followed
                                ? <button key={m.id}
                                          disabled={props.followingId.some(id => id === m.id)}
                                          onClick={() => {
                                              props.unFollowThunkCreator(m.id)
                                          }}>Unfollow</button>
                                : <button key={m.id}
                                          disabled={props.followingId.some(id => id === m.id)}
                                          onClick={() => {
                                              props.followThunkCreator(m.id)
                                          }}>Follow</button>}
                        </div>
                    </span>
                        <span>
                        <span>
                    <div>{m.name}</div>
                    <div>{m.status}</div>
                            </span>
                        <span>
                    <div>{'m.location.country'}</div>
                             <div>{'m.location.city'}</div>
                        </span>
                    </span>
                    </div>
                })}
            </div>
        </div>

    )
}

