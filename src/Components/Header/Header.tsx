import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {RoutesPath} from "../../RoutesPath";


type HeaderPropsType = {
    isAuth: boolean
    login: string
    logout: () => void
}
export const Header = (props: HeaderPropsType) => {

    return (
        <div className={s.header}>
            <div className={s.content}>
                Welcome

                <div className={s.loginBlock}>
                    {
                        !props.isAuth
                            ? <NavLink to={RoutesPath.login}>login</NavLink>
                            : <div style={{color: 'yellow', fontSize: '20px'}}>
                                <button onClick={props.logout}>logOUT</button>
                                {props.login}</div>
                    }
                </div>

            </div>
        </div>
    )
}