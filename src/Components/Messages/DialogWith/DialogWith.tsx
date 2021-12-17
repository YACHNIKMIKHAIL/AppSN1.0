import React, {useState} from "react";
import s from './DialogWith.module.css'
import {MyFriendsType} from "../../redux/stote";

type DialogWithPropsType = {
    myFriends: MyFriendsType
}
export const DialogWith = (props: DialogWithPropsType) => {

        return (
            <>
                <div className={s.content} onClick={()=>alert(props.myFriends.name)}>
                    <img
                        src={props.myFriends.img}
                        className={s.image}
                        alt=""/>
                    <div className={s.name}>
                        {props.myFriends.name}
                    </div>
                </div>
            </>
    )
}