import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


type HeaderPropsType = {
    isAuth: boolean
    login: string
    logout: () => void
}
export const Header = (props: HeaderPropsType) => {

    return (
        <div className={s.header}>
            <div className={s.content}>
                WelcomeToFixieSocialNetwork

                <div className={s.loginBlock}>
                    {
                        !props.isAuth
                            ? <NavLink to={'/login'}>login</NavLink>
                            : <div style={{color: 'yellow', fontSize: '20px'}}>
                                <button onClick={props.logout}>logOUT</button>
                                {props.login}</div>
                    }
                </div>

            </div>
        </div>
    )
}