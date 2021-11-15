import React, {useState} from "react";
import s from './DialogWith.module.css'
import {DialogsMessages} from "./DialogsMessages/DialogsMessages";
import {NavLink} from "react-router-dom";
import {MyFriendsType} from "../../redux/state";

type DialogWithPropsType={
    myFriends:Array<MyFriendsType>
}
export const DialogWith = (props: DialogWithPropsType) => {
    // const  [isClick, setIsClick] = useState(false)

    let Friend=props.myFriends.map((ff)=>{
        return (
            // <NavLink to={'/dialogMessages/'}>
                <>
                    {/*{isClick && <DialogsMessages/>}*/}
                    <div className={s.content}>
                        {/*onClick={() => setIsClick(true)}>*/}
                        <img
                            src={ff.img}
                            className={s.image}
                            alt=""/>
                        <div className={s.name}>
                            {ff.name}
                        </div>
                        {/*link*/}
                    </div>
                </>
            // </NavLink>
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