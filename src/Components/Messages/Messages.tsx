import React from "react";
import s from './Messages.module.css'
import {DialogWith} from "./DialogWith/DialogWith";
import {BrowserRouter, Route} from "react-router-dom";
import {MyFriendsType} from "../redux/state";

type MessagesPropsType={
    myFriends:Array<MyFriendsType>
}
export const Messages = (props:MessagesPropsType) => {
    return (

        <div className={s.content}>
            <DialogWith myFriends={props.myFriends}/>

            {/*<DialogWith/>*/}
        </div>

    )
}

