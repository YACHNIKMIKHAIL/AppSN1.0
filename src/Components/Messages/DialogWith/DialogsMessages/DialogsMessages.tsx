import React from "react";
import s from './DialogsMessages.module.css'
import {AllMessagesType, MyFriendsType} from "../../../redux/state";


type DialogsMessagesPropsType = {
    messages:Array<MyFriendsType>
}
export const DialogsMessages = (props: DialogsMessagesPropsType) => {
    // let myMess = props.messages.map((mm) => {
    //     const myMessages = mm.messages.myMess.map(item => <div className={s.myMess}>{item}
    //     </div>);
    //     return <>{myMessages}</>
    let myMess = props.messages.map((ff) => {
        return(
            <div className={s.myMess}>
                {ff.messages.myMess}
            </div>
        )
    })
    let friendMess = props.messages.map((ff) => {
        return(
        <div className={s.friendMess}>
            {ff.messages.friendMess}
        </div>
        )
    })

    return (
        <div className={s.content}>
            <div>
                {myMess}
            </div>
            <div>
                {friendMess}
            </div>
        </div>
    )
}