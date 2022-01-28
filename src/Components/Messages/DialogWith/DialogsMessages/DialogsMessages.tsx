import React from "react";
import s from './DialogsMessages.module.css'
import {MessagesType} from "../../../redux/stote";



type DialogsMessagesPropsType = {
    messages: MessagesType
    newMessageBody: string
    updateNewMessageBody: (boby: string) => void
    sendNewMessage: () => void
    isAuth: boolean
}
export const DialogsMessages = (props: DialogsMessagesPropsType) => {
    let newMessageBody = props.messages
    let newMessageElement = React.createRef<HTMLInputElement>();
    let sendMessage = () => {
        let message = newMessageElement.current?.value;
        alert('NEW MESSAGE!')
    }

    // if (props.isAuth) return <Navigate to={"/login"}/>


    const onSendMessageClick = () => {
        props.sendNewMessage()
    }
    const onNewMassageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.updateNewMessageBody(e.currentTarget.value)
    }

    let myMess = props.messages.myMess.map((ff) => {
        return (
            <div className={s.myMess}>
                {ff.title}
            </div>
        )
    })
    let friendMess = props.messages.friendMess.map((ff) => {
        return (
            <div className={s.friendMess}>
                <div key={ff.id}>{ff.title}</div>
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
                       placeholder='New Message'
                       value={props.newMessageBody}
                       onChange={(e) => onNewMassageChange(e)}
                />
                <button onClick={onSendMessageClick}>Send</button>
            </div>
        </div>
    )
}