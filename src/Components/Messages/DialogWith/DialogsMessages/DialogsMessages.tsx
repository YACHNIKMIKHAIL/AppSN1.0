import React from "react";
import s from './DialogsMessages.module.css'
import {MessagesType} from "../../../redux/stote";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../Utils/Validators/validators";

type DialogsMessagesPropsType = {
    messages: MessagesType
    newMessageBody: string
    updateNewMessageBody: (boby: string) => void
    sendNewMessage: (newMessageBody: string) => void
    isAuth: boolean
}
export const DialogsMessages = (props: DialogsMessagesPropsType) => {
    const addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendNewMessage(values.newMessageBody)
    }
    let myMess = props.messages.myMess.map((ff, i) => {
        return (
            <div className={s.myMess} key={i}>
                {ff.title}
            </div>
        )
    })
    let friendMess = props.messages.friendMess.map((ff, i) => {
        return (
            <div className={s.friendMess} key={i}>
                <div>{ff.title}</div>
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


const maxLength20 = maxLengthCreator(20)
export type NewMessageFormValuesType = {
    newMessageBody: string
}

export type AddMessageFormType = {
    newMessageBody: string
}
type AddMessageFormValuseTypeKeys = Extract<keyof AddMessageFormType, string>

export const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, {}> & {}>
    = (props) => {
    return <>
        <form className={s.teaxtarea} onSubmit={props.handleSubmit}>
            <div>
                {/*<Field component={Textarea} validate={[required, maxLength20]}*/}
                {/*       name='newMessageBody' placeholder='New Message'/>*/}
                {createField<AddMessageFormValuseTypeKeys>('New Message', 'newMessageBody', [required, maxLength20], Textarea)}
            </div>
            <button>Send</button>
        </form>
    </>
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)