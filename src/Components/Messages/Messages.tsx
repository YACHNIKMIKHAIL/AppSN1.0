import React from "react";
import s from './Messages.module.css'
import {DialogWith} from "./DialogWith/DialogWith";
import {MyFriendsType} from "../redux/state";
import {DialogsMessages} from "./DialogWith/DialogsMessages/DialogsMessages";

type MessagesPropsType = {
    myFriends: Array<MyFriendsType>
}
export const Messages = (props: MessagesPropsType) => {
    return (

        <div className={s.content}>
            <DialogWith myFriends={props.myFriends}/>
            <DialogsMessages messages={props.myFriends}/>
        </div>

    )
}

