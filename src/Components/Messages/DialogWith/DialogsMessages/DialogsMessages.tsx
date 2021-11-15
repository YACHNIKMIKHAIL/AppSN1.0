import React from "react";
import s from './DialogsMessages.module.css'
import { MyFriendsType} from "../../../redux/state";


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
                {ff.messages.myMess.map((mm,) => {
                    return (
                        <div>{mm.title}</div>
                    )
                })}
            </div>
        )
    })
    let friendMess = props.messages.map((ff) => {
        return(
        <div className={s.friendMess}>
            {ff.messages.friendMess.map((friendMess) => {
                return (
                    <div>{friendMess.title}</div>
                )
            })}
        </div>
        )
    })

    return (
        <div className={s.content}>
                {/*onClick={() => setIsClick(true)}>*/}
                {/*<img/>*/}
                {/*<div className={s.name}>*/}

                {/*</div>*/}
                {/*link*/}

            <div>
                {myMess}
            </div>
            <div>
                {friendMess}
            </div>
        </div>
    )
}