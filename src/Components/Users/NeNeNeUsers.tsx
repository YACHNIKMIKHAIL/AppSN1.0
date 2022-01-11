import React from "react";
import s from './Users.module.css'
import {UserType} from "../redux/user-reducer";
import axios from "axios";
import userPhoto from './../Images/avas/images.jpeg'

type UsersPropsType = {
    users: Array<UserType>
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (users: Array<UserType>) => void
}
export const NeNeNeUsers = (props: UsersPropsType) => {

    const getUsers=()=>{
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

    return (
        <div className={s.content}>
            <button onClick={()=>getUsers()}>Get users</button>
            {props.users?.map(m => {
                return <div key={m.id}>
                    <span>
                        <div>
                            <img src={m.photos.small !== null ? m.photos.small : userPhoto}
                            alt={'sfadfc'}/>
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

