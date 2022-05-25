import {newMessageActions,} from "../../../redux/newMessage-reducer";
import {DialogsMessages} from "./DialogsMessages";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../../redux/reduxStore";
import {WithAuthRedirect} from "../../../Hoc/WithAuthRedirect";
import React from "react";

const mapStateToProps = (state: AppStateType) => {
    return {
        messages: state.myFriends.myFriends.messages,
        newMessageBody: state.myFriends.myFriends.newMessageBody,
    }
}
// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//         sendNewMessage: (newMessageBody: string) => {
//             dispatch(newMessageActions.sendNewMessage(newMessageBody))
//         }
//     }
// }
compose<React.ComponentType>(
    connect(mapStateToProps, {sendNewMessage: newMessageActions.sendNewMessage}),
    WithAuthRedirect
)(DialogsMessages)

export const DialogsMessagesContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {sendNewMessage: newMessageActions.sendNewMessage}),
    WithAuthRedirect
)(DialogsMessages)

