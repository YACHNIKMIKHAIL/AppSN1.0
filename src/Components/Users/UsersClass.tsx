import React from "react";
import {UserType} from "../redux/user-reducer";
import axios from "axios";
import userPhoto from './../../assets/images/images.png'
import s from './Users.module.css'

type UsersPropsType = {
    users: Array<UserType>
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (users: Array<UserType>) => void
}

export class UsersClass extends React.Component<UsersPropsType, Array<UserType>> {
    constructor(props: UsersPropsType) {
        alert('New instance')
        super(props);
    }

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div className={s.content}>
                {this.props.users?.map(m => {
                    return <div key={m.id}>
                    <span>
                        <div>
                            <img src={m.photos.small !== null ? m.photos.small : userPhoto}/>
                        </div>
                        <div>
                            {m.followed
                                ? <button onClick={() => this.props.unFollow(m.id)}>Unfollow</button>
                                : <button onClick={() => this.props.follow(m.id)}>Follow</button>}
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
}