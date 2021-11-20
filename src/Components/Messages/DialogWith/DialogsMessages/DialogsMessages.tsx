import React from "react";
import s from './DialogsMessages.module.css'
import {MyFriendsType} from "../../../redux/state";


type DialogsMessagesPropsType = {
    messages: Array<MyFriendsType>
    // sendMessage:()=>void
}
export const DialogsMessages = (props: DialogsMessagesPropsType) => {

    let newMessageElement=React.createRef<HTMLInputElement>();
    let sendMessage=()=>{
        let message=newMessageElement.current?.value;
        alert('NEW MESSAGE!')
    }

    let myMess = props.messages.map((ff) => {
        return (
            <div className={s.myMess}>
                {ff.messages.myMess.map((mm,) => {
                    return (
                        <div key={mm.id}>{mm.title}</div>
                    )
                })}
            </div>
        )
    })
    let friendMess = props.messages.map((ff) => {
        return (
            <div className={s.friendMess}>
                {ff.messages.friendMess.map((friendMess) => {
                    return (
                        <div key={friendMess.id}>{friendMess.title}</div>
                    )
                })}
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
            <div className={s.teaxtarea}>
                <input type="text"
                placeholder='New message'
                ref={newMessageElement}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}