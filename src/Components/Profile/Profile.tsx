import React, {useEffect} from "react";
import s from './Profile.module.css'
import Preloader from "../Common/Preloader/Preloader";
import {ProfileType} from "../redux/profile-reducer";
import ProfileStatus from "./ProfileStatus";

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}
export const Profile = (props: ProfilePropsType) => {
    // console.log(Object.keys(props.profile).length)
    useEffect(() => {

    }, [])
    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }


    return (
        <div className={s.content}>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            {props.profile.fullName}
            <img
                src={props.profile.photos?.small || ""}
                alt=""/>

            <span>{props.profile.aboutMe}</span>
            <div className={s.info}>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.lookingForAJobDescription}</div>
                <div style={props.profile.lookingForAJob ? {color: 'green'} : {color: 'red'}}>Looking for a JOB</div>
            </div>

        </div>
    )
}
