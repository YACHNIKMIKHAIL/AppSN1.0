import React from "react";
import s from './Users.module.css'
import {unFollowThunkCreator, UserType} from "../redux/user-reducer";
import userPhoto from './../../assets/images/images.png'
import {NavLink} from "react-router-dom";
import {usersApi} from "../../API/Api";


type UsersPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => void
    unFollow: (id: number) => void
    toggleFollowingInProgress: (followingInProgress: boolean, id: number) => void
    followingInProgress: boolean
    followingId: Array<number>
    // setUsers: (users: Array<UserType>) => void
    unFollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
}
export const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    console.log(props.followingId)
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
                            <div style={m.followed ? {color: 'yellow'} : {color: 'red'}}>
                                {m.followed ? 'FOLOWED' : "UNFOLOWED"}</div>

                            {m.followed
                                ? <button key={m.id}
                                          disabled={props.followingId.some(id => id === m.id)}
                                          onClick={() => {
                                              // props.toggleFollowingInProgress(true, m.id)
                                              // usersApi.unFollow(m.id).then(data => {
                                              //         if (data.resultCode === 0) {
                                              //             props.unFollow(m.id)
                                              //         }
                                              //         props.toggleFollowingInProgress(false, m.id)
                                              //     }
                                              // )
                                              props.unFollowThunkCreator(m.id)

                                          }}>Unfollow</button>
                                : <button key={m.id}
                                          disabled={props.followingId.some(id => id === m.id)}
                                          onClick={() => {
                                              // props.toggleFollowingInProgress(true, m.id)
                                              // usersApi.follow(m.id).then(data => {
                                              //         if (data.resultCode === 0) {
                                              //             props.follow(m.id)
                                              //         }
                                              //         props.toggleFollowingInProgress(false, m.id)
                                              //     }
                                              // )
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

    )
}

