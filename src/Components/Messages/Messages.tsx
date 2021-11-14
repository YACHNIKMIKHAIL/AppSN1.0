import React from "react";
import s from './Messages.module.css'
import {DialogWith} from "./DialogWith/DialogWith";
import {BrowserRouter, Route} from "react-router-dom";


export const Messages = () => {
    return (

        <div className={s.content}>
            <DialogWith/>

            {/*<DialogWith/>*/}
        </div>

    )
}

