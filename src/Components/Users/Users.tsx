import React, {ChangeEvent} from "react";
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";


export const Users = (props: UsersPropsType) => {


    return (
        <div className={s.content}>
            <div>User 1</div>
        </div>
    )
}

