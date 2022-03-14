import React from "react";
import s from './Profile.module.css'
import Preloader from "../Common/Preloader/Preloader";
import {ProfileType} from "../redux/profile-reducer";
import userPhoto from "./../../assets/images/images.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (newPhoto: File) => void
}
export const Profile = (props: ProfilePropsType) => {

    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const {length} = e.target.files;
            if (length) {
                props.savePhoto(e.target.files[0])
            }
        }
    }

    return (
        <div className={s.content}>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            {props.profile.fullName}
            <img className={s.mainPhote}
                 src={props.profile.photos?.small || props.profile.photos?.large || userPhoto}
                 alt=""/>
            {props.isOwner && <input type="file" onChange={(e) => onMainPhotoSelected(e)}/>}
            <span>{props.profile.aboutMe}</span>
            <div className={s.info}>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.lookingForAJobDescription}</div>
                <div style={props.profile.lookingForAJob ? {color: 'green'} : {color: 'red'}}>Looking for a JOB</div>
            </div>

        </div>
    )
}
