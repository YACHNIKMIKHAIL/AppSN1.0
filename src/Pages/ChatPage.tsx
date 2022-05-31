import React, {useEffect, useState} from 'react';
import {ChatMessageType} from "../API/ChatApi";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, StatusType, stopMessagesListening} from "../Components/redux/chat-reducer";
import {AppStateType} from "../Components/redux/reduxStore";


const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

export default ChatPage;

const Chat: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    return (
        <div>
            <ChatMessages/>
            <ChatAddMessageForm/>
        </div>
    )
}

const ChatMessages: React.FC = () => {
    const messages = useSelector<AppStateType, ChatMessageType[]>(state => state.chat.messages)
    return (
        <div style={{height: '400px', overflow: 'auto'}}>
            {messages && messages.map((m, i) => {
                return <ChatMessage message={m} key={`${m.userId}${m.message}${Math.random() * i}`}/>
            })}
        </div>
    )
}

const ChatMessage: React.FC<{
    message: ChatMessageType

}> = (props) => {
    const {userName, message, photo} = props.message
    return (
        <div style={{
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: 'rgba(194,193,193,0.51)'
        }}>
            <div>
                <img src={photo} alt="hbcahsb"
                     style={{height: '50px', width: '50px', borderRadius: '50%', marginRight: '20px'}}/>
                <b>{userName}</b>
            </div>
            <div style={{display: 'flex', justifyContent: 'start', width: '95%', flexWrap: 'nowrap'}}>
                {message}
            </div>
        </div>
    )
}
const ChatAddMessageForm: React.FC = () => {
    const [newMessage, setNewMessage] = useState<string>('')
    const readyStatus = useSelector<AppStateType, StatusType>(state => state.chat.status)
    const dispatch = useDispatch()

    const sendMessageX = () => {
        if (!newMessage) return
        dispatch(sendMessage(newMessage))
    }
    return (
        <div>
            <div>
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={sendMessageX}
                        disabled={readyStatus === 'pending'}
                >Send
                </button>
                <div>{
                    readyStatus === 'pending'
                        ? 'disabled'
                        : 'undisabled'
                }</div>
            </div>
        </div>
    )
}