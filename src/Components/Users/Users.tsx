import React from "react";
import s from './Users.module.css'
import {UserType} from "../redux/user-reducer";
import userPhoto from './../../assets/images/images.png'
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => void
    unFollow: (id: number) => void
    // setUsers: (users: Array<UserType>) => void
}
export const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div className={s.content}>
            <div>{pages.map(p => {
                return <span onClick={() => {
                    props.onPageChanged(p)
                }} className={props.currentPage === p ? s.selected : ''}>-{p}-</span>
            })}
            </div>
            {/*<button onClick={() => getUsers()}>Get users</button>*/}
            {props.users?.map(m => {
                return <div key={m.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + m.id}>
                            <img src={m.photos.small !== null ? m.photos.small : userPhoto}
                                 alt={'fsgf'}/>
                            </NavLink>
                        </div>
                        <div>
                            {m.followed
                                ? <button onClick={() => props.unFollow(m.id)}>Unfollow</button>
                                : <button onClick={() => props.follow(m.id)}>Follow</button>}
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
    )
}

