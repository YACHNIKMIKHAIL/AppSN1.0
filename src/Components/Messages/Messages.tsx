import React from "react";
import s from './Messages.module.css'
import {DialogWith} from "./DialogWith/DialogWith";
import {DialogsMessagesContainer} from "./DialogWith/DialogsMessages/DialogsMessagesContainer";


type MessagesPropsType = {
    // myFriends: MyFriendsType
    // dispatch: (action: any) => void

}
export const Messages = (props: MessagesPropsType) => {
    return (

        <div className={s.content}>
            <DialogWith/>
            <DialogsMessagesContainer/>
        </div>

    )
}

