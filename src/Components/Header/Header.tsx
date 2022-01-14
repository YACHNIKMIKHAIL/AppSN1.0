import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.content}>
            WelcomeToFixieSocialNetwork

                <div className={s.loginBlock}>
                    <NavLink to={'/login'}>
                        login
                    </NavLink>
                </div>

            </div>
        </div>
    )
}