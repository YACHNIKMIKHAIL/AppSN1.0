import React from "react";
import s from './DialogsMessages.module.css'
import {MessagesType} from "../../../redux/stote";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ReactReduxContextValue, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";


type DialogsMessagesPropsType = {
    messages: MessagesType
    newMessageBody: string
    updateNewMessageBody: (boby: string) => void
    sendNewMessage: (newMessageBody: string) => void
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
        // props.sendNewMessage()
    }
    const onNewMassageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.updateNewMessageBody(e.currentTarget.value)
    }

    const addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendNewMessage(values.newMessageBody)
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
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}
export const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, {}> & {}>
    = (props) => {
    return <>
        <form className={s.teaxtarea} onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessageBody' placeholder='New Message'/>
            </div>
            <button>Send</button>
        </form>
    </>
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)