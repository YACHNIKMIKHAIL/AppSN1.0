import React, {useState} from "react";
import s from './DialogWith.module.css'
import {MyFriendsType} from "../../redux/state";

type DialogWithPropsType = {
    myFriends: Array<MyFriendsType>
}
export const DialogWith = (props: DialogWithPropsType) => {
    let Friend = props.myFriends.map((ff) => {
        return (
            <>
                <div className={s.content} onClick={()=>alert(ff.name)}>
                    <img
                        src={ff.img}
                        className={s.image}
                        alt=""/>
                    <div className={s.name}>
                        {ff.name}
                    </div>
                </div>
            </>
        )
    })
    return (
        <div className={s.content1}>
            <>
                {Friend}
            </>
        </div>
    )
}