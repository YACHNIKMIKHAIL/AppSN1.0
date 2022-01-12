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
    return (
        <div className={s.content}>
            <img
                src={props.profile.photos.small}
                alt=""/>
            <span>{props.profile.aboutMe}</span>
            <div className={s.info}>

                <div>{props.profile.fullName}</div>
                <div>{props.profile.lookingForAJobDescription}</div>
                <div style={props.profile.lookingForAJob? {color:'green'}:{color:'red'}}>Looking for a JOB</div>

            </div>

        </div>
    )
}
