import React from "react";
import s from './Footer.module.css'
import {NavLink} from "react-router-dom";
import {RoutesPath} from "../../RoutesPath";

export const Footer = () => {
    return (
        <div className={s.footer}>
            <div className={s.content}>
                <div className={s.news}>
                    <NavLink to='/users'
                             className={({isActive}) => ((isActive ? s.active : ''))}> Contacts</NavLink>
                </div>
                <div className={s.posts}>
                    <NavLink to='/posts'
                             className={({isActive}) => ((isActive ? s.active : ''))}> Posts</NavLink>
                </div>
                <div className={s.messages}>
                    <NavLink to={RoutesPath.messages}
                             className={({isActive}) => (isActive ? s.active : '')}>Messages</NavLink>
                </div>
                <div className={s.profile}>
                    <NavLink to={RoutesPath.profile}
                             className={({isActive}) => (isActive ? s.active : '')}>Profile</NavLink>
                </div>
                <div className={s.settings}>
                    Settings
                </div>
            </div>
        </div>
    )
}
