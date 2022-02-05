import React from "react";
import s from './Messages.module.css'
import {DialogWith} from "./DialogWith/DialogWith";
import {DialogsMessagesContainer} from "./DialogWith/DialogsMessages/DialogsMessagesContainer";

export const Messages = () => {
    return (

        <div className={s.content}>
            <DialogWith/>
            <DialogsMessagesContainer/>
        </div>

    )
}

