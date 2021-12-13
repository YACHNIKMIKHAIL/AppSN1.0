import React, {ChangeEvent} from "react";
import s from './DialogsMessages.module.css'
import {
    MyFriendsType, sendNewMessageAC,
    updateNewMessageBodyAC,
} from "../../../redux/state";


type DialogsMessagesPropsType = {
    messages: MyFriendsType
    // sendMessage:()=>void
    dispatch: (action: any) => void
    newMessageBody: string
}
export const DialogsMessages = (props: DialogsMessagesPropsType) => {
    let newMessageBody = props.messages
    let newMessageElement = React.createRef<HTMLInputElement>();
    let sendMessage = () => {
        let message = newMessageElement.current?.value;
        alert('NEW MESSAGE!')
    }

    const onSendMessageClick = () => {
        props.dispatch(sendNewMessageAC())
    }
    const onNewMassageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // e.currentTarget.value
        props.dispatch(updateNewMessageBodyAC(e.currentTarget.value))
    }

    let myMess = props.messages.messages.myMess.map((ff) => {
        return (
            <div className={s.myMess}>
                {ff.title}
            </div>
        )
    })
    let friendMess = props.messages.messages.friendMess.map((ff) => {
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
                       onChange={onNewMassageChange}
                    // ref={newMessageElement}
                />
                <button onClick={onSendMessageClick}>Send</button>
            </div>
        </div>
    )
}