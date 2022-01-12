import React from "react";
import s from './Profile.module.css'
import Preloader from "../Common/Preloader/Preloader";
import {ProfileType} from "../redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType
}
export const Profile = (props: ProfilePropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    console.log(props)
    return (
        <div className={s.content}>
            <img
                src={props.profile.photos.small}
                alt=""/>
            <div className={s.info}>
                <div>
                </div>
            </div>

        </div>
    )
}