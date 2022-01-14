import React, {useEffect} from "react";
import s from './Profile.module.css'
import Preloader from "../Common/Preloader/Preloader";
import {ProfileType} from "../redux/profile-reducer";
import {useParams} from "react-router-dom";

type ProfilePropsType = {
    profile: ProfileType

}
export const Profile = (props: ProfilePropsType) => {

    // console.log(Object.keys(props.profile).length)
    useEffect(()=>{

    },[])
    console.log(props.profile)
    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }


    return (
        <div className={s.content}>
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
