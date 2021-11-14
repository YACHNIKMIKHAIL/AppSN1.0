import React, {useState} from "react";
import s from './DialogWith.module.css'
import {DialogsMessages} from "./DialogsMessages/DialogsMessages";
import {NavLink} from "react-router-dom";

export const DialogWith = () => {
    // const  [isClick, setIsClick] = useState(false)

    return (
        <>
            {/*{isClick && <DialogsMessages/>}*/}
        <div className={s.content}>
             {/*onClick={() => setIsClick(true)}>*/}

            <img
                src="https://us.123rf.com/450wm/hectormanzana/hectormanzana1312/hectormanzana131200014/24258358-long-exposure-taken-from-a-camera-fixed-on-a-fixed-gear-bicycle-in-the-forehand-a-close-up-of-the-ha.jpg?ver=6"
                className={s.image}
                alt=""/>
            <div className={s.name}>
                My Contact With
            </div>
            <NavLink to={'/dialogMessages'}>link</NavLink>
        </div>
        </>
    )
}