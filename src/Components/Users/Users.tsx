import React, {ChangeEvent} from "react";
import s from './Users.module.css'
import {UserType} from "../redux/user-reducer";
// import {UsersPropsType} from "./UsersContainer";

type UsersPropsType = {
    users: Array<UserType>
    follow:(id:number)=>void
    unFollow:(id:number)=>void
    setUsers:(users:Array<UserType>)=>void
}
export const Users = (props: UsersPropsType) => {
props.setUsers([
    {
        id: 1,
        photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
        followed: true,
        fullName: 'Vitalya',
        status: 'I am the best',
        location: {city: 'Brest', country: 'Belarus'}
    },
    {
        id: 2,
        photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
        followed: false,
        fullName: 'Igor',
        status: 'I am the best of the best',
        location: {city: 'Brest', country: 'Belarus'}
    },
    {
        id: 3,
        photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
        followed: false,
        fullName: 'Egor',
        status: 'I am the best of the best of the best',
        location: {city: 'Brest', country: 'Belarus'}
    },
    {
        id: 4,
        photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
        followed: true,
        fullName: 'Genya',
        status: 'I am the best of the best of the best of the best',
        location: {city: 'Brest', country: 'Belarus'}
    },
    {
        id: 5,
        photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
        followed: true,
        fullName: 'Romchik',
        status: 'I am the best of the best of the best of the best of the best',
        location: {city: 'Gomel', country: 'Belarus'}
    },
])

    return (
        <div className={s.content}>
            {props.users.map(m => {
                return <div key={m.id} >
                    <span>
                        <div>
                            <img src={m.photoUrl}/>
                        </div>
                        <div>
                            {m.followed
                                ?<button onClick={()=>props.unFollow(m.id)}>Unfollow</button>
                                :<button onClick={()=>props.follow(m.id)}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                    <div>{m.fullName}</div>
                    <div>{m.status}</div>
                            </span>
                        <span>
                    <div>{m.location.country}</div>
                             <div>{m.location.city}</div>
                        </span>
                    </span>
                </div>
            })}
        </div>
    )
}

