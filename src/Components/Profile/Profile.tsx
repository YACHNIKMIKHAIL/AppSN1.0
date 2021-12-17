import React from "react";
import s from './Profile.module.css'
import {DobType, LocationType, MyInfoType, NameType} from "../redux/stote";

type ProfilePropsType = {
    myInfo: MyInfoType
}
export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bppCsCAUdtT9phvF05pL3LjjJ8J0XipHBA&usqp=CAU"
                alt=""/>
            <div className={s.info}>
                <div>{props.myInfo.gender}</div>
                <div>{props.myInfo.dob.date}</div>
                <div>{props.myInfo.dob.age}</div>
                <div>{props.myInfo.email}</div>
                <div>{props.myInfo.name.last}</div>
                <div>{props.myInfo.name.title}</div>
                <div> {props.myInfo.name.first}</div>
                <div>{props.myInfo.phone}</div>
                <div>{props.myInfo.location.state}</div>
                <div>{props.myInfo.location.city}</div>
                <div>{props.myInfo.location.street}</div>
            </div>

        </div>
    )
}