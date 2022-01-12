import React from "react";
import s from './Profile.module.css'
import Preloader from "../Common/Preloader/Preloader";

type ProfilePropsType = {
    profile: any
}
export const Profile = (props: ProfilePropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={s.content}>
            <img
                src={props.profile.photos.large}
                alt=""/>
            <div className={s.info}>
                <div>
                </div>
            </div>

        </div>
    )
}