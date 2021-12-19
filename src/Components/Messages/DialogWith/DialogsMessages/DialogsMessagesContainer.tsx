import React, {ChangeEvent} from "react";
import {
    sendNewMessageAC,
    updateNewMessageBodyAC,
} from "../../../redux/newMessage-reducer";
import {MyFriendsType} from './../../../redux/stote'
import {DialogsMessages} from "./DialogsMessages";


type DialogsMessagesContainer = {
    messages: MyFriendsType
    dispatch: (action: any) => void
    newMessageBody: string
}
export const DialogsMessagesContainer = (props: DialogsMessagesContainer) => {
    let newMessageBody = props.messages
    let newMessageElement = React.createRef<HTMLInputElement>();
    let sendMessage = () => {
        let message = newMessageElement.current?.value;
        alert('NEW MESSAGE!')
    }

    const onSendMessageClick = () => {
        props.dispatch(sendNewMessageAC())
    }
    const onNewMassageChange = (boby: string) => {
        props.dispatch(updateNewMessageBodyAC(boby))
    }
    let state = props.messages.messages

    // let myMess = state.messages.myMess.map((ff) => {
    //     return (
    //         <div className={s.myMess}>
    //             {ff.title}
    //         </div>
    //     )
    // })
    // let friendMess = state.messages.friendMess.map((ff) => {
    //     return (
    //         <div className={s.friendMess}>
    //             <div key={ff.id}>{ff.title}</div>
    //         </div>
    //     )
    // })

    return <DialogsMessages updateNewMessageBody={onNewMassageChange}
                            sendNewMessage={onSendMessageClick}
                            messages={props.messages}
                            newMessageBody={props.newMessageBody}
                            />
}