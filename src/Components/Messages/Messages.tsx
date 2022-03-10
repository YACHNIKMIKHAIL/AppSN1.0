import React from "react";
import s from './Messages.module.css'
import {DialogWith} from "./DialogWith/DialogWith";
import {DialogsMessagesContainer} from "./DialogWith/DialogsMessages/DialogsMessagesContainer";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/reduxStore";
import {Navigate} from "react-router-dom";

const Messages = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    if (!isAuth) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className={s.content}>

            <DialogWith/>
            <DialogsMessagesContainer/>

        </div>
    )
}

export default Messages;