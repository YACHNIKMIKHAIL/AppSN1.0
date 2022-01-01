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
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (usersCount: number) =>void
    totalCount: number
    pageSize: number
    currentPage: number
}

export class UsersClass extends React.Component<UsersPropsType, Array<UserType>> {
    constructor(props: UsersPropsType) {
        // alert('New instance')
        super(props);
    }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })

    }

    render() {
        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div className={s.content}>
                {pages.map(m => {
                    return <span className={this.props.currentPage === m ? s.selected : ''}
                                 onClick={() => this.onPageChanged(m)}>{m}</span>
                })}

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