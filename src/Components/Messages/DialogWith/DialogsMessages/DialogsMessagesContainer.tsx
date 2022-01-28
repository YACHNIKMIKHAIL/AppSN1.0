import {sendNewMessageAC, updateNewMessageBodyAC,} from "../../../redux/newMessage-reducer";
import {DialogsMessages} from "./DialogsMessages";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../../redux/reduxStore";
import {WithAuthRedirect} from "../../../Hoc/WithAuthRedirect";
import React from "react";


// type DialogsMessagesContainer = {
//     // messages: MyFriendsType
//     // dispatch: (action: any) => void
//     // newMessageBody: string
// }
// export const DialogsMessagesContainer = (props: DialogsMessagesContainer) => {
//     // let newMessageBody = props.messages
//     let newMessageElement = React.createRef<HTMLInputElement>();
//     let sendMessage = () => {
//         let message = newMessageElement.current?.value;
//         alert('NEW MESSAGE!')
//     }
//     // let state = props.messages.messages
//     // let myMess = state.messages.myMess.map((ff) => {
//     //     return (
//     //         <div className={s.myMess}>
//     //             {ff.title}
//     //         </div>
//     //     )
//     // })
//     // let friendMess = state.messages.friendMess.map((ff) => {
//     //     return (
//     //         <div className={s.friendMess}>
//     //             <div key={ff.id}>{ff.title}</div>
//     //         </div>
//     //     )
//     // })
//     // return (
//     //     <StoreContext.Consumer>
//     //         {(store) => {
//     //             const onSendMessageClick = () => {
//     //                 store.dispatch(sendNewMessageAC())
//     //             }
//     //             const onNewMassageChange = (boby: string) => {
//     //                 store.dispatch(updateNewMessageBodyAC(boby))
//     //             }
//     //
//     //             return <DialogsMessages updateNewMessageBody={onNewMassageChange}
//     //                                     sendNewMessage={onSendMessageClick}
//     //                                     messages={store.getState().myFriends.myFriends}
//     //                                     newMessageBody={store.getState().myFriends.myFriends.newMessageBody}
//     //             />
//     //         }}
//     //     </StoreContext.Consumer>
//     // )

// type mapStateToPropsType = {
//     myFriends:MyFriendsType
// }
// type DispatchPropsType = {
//     updateNewMessageBody: (boby: string) => void
//     sendNewMessage: () => void
// }
const mapStateToProps = (state: AppStateType) => {
    console.log('state', state)
    return {
        messages: state.myFriends.myFriends.messages,
        newMessageBody: state.myFriends.myFriends.newMessageBody,
        // isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessageBody: (boby: string) => {
            dispatch(updateNewMessageBodyAC(boby))
        },
        sendNewMessage: () => {
            dispatch(sendNewMessageAC())
        }
    }
}
// const AuthRedirectComponent=WithAuthRedirect(DialogsMessages)
compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(DialogsMessages)

export const DialogsMessagesContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(DialogsMessages)

