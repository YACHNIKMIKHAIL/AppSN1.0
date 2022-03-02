import React from "react";
import {UserType} from "../redux/user-reducer";
import userPhoto from "./../../assets/images/images.png"
import {NavLink} from "react-router-dom";
import s from "./Users.module.css"


type UsersPropsType = {
    user: UserType
    followingId: Array<number>
    unFollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
}
export const User = ({user, followingId, followThunkCreator, unFollowThunkCreator}: UsersPropsType) => {

    return (
        <div className={s.u}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                                 alt={'fsgf'}/>
                            </NavLink>
                        </div>
                        <div>
                            <div style={user.followed ? {color: 'yellow'} : {color: 'red'}}>
                                {user.followed ? 'FOLOWED' : "UNFOLOWED"}</div>

                            {user.followed
                                ? <button key={user.id}
                                          disabled={followingId.some(id => id === user.id)}
                                          onClick={() => {
                                              unFollowThunkCreator(user.id)
                                          }}>Unfollow</button>
                                : <button key={user.id}
                                          disabled={followingId.some(id => id === user.id)}
                                          onClick={() => {
                                              followThunkCreator(user.id)
                                          }}>Follow</button>}
                        </div>
                    </span>
            <span>
                        <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                            </span>
                        <span>
                    <div>{'m.location.country'}</div>
                             <div>{'m.location.city'}</div>
                        </span>
                    </span>
        </div>
    )
}

