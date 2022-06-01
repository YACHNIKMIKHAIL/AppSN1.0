import React, {useEffect, useRef, useState} from 'react';
import {StatusType} from "../API/ChatApi";
import {useDispatch, useSelector} from "react-redux";
import {
    ChatMessageType,
    sendMessage,
    startMessagesListening,
    stopMessagesListening
} from "../Components/redux/chat-reducer";
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
    const status = useSelector<AppStateType, StatusType>(state => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    return (
        <div>
            {status === 'error' && <div>Some ERROR. Please refresh page</div>}
            <>
                <ChatMessages/>
                <ChatAddMessageForm/>
            </>
        </div>
    )
}

const ChatMessages: React.FC = () => {
    const messages = useSelector<AppStateType, ChatMessageType[]>(state => state.chat.messages)
    const messageAnchorRef = useRef<HTMLDivElement | null>(null)
    const [autoScrollIsActive, setAutoScrollIsActive] = useState<boolean>(true)
    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight < 300) {
            !autoScrollIsActive && setAutoScrollIsActive(true)
        } else {
            autoScrollIsActive && setAutoScrollIsActive(false)
        }
    }
    useEffect(() => {
        if (autoScrollIsActive) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    return (
        <div style={{
            height: '400px', overflow: 'auto',
            borderRadius: '10px',
        }} onScroll={onScrollHandler}>
            {messages && messages.map((m, i) => {
                return <ChatMessage x={m} key={m.messageId}/>
                //`${m.userId}${m.message}${Math.random() * i}`
            })}
            <div ref={messageAnchorRef}/>
        </div>
    )
}

const ChatMessage: React.FC<{
    x: ChatMessageType

}> = React.memo(({x}) => {
    const {userName, message, photo} = x
    console.log('>>>>>>> ChatMessage!!!')

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
})

const ChatAddMessageForm: React.FC = () => {
    const [newMessage, setNewMessage] = useState<string>('')
    const status = useSelector<AppStateType, StatusType>(state => state.chat.status)
    const dispatch = useDispatch()

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') sendMessageX()
    }
    const sendMessageX = () => {
        if (!newMessage) return
        dispatch(sendMessage(newMessage))
        setNewMessage('')
    }
    return (
        <div>
            <div>
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.currentTarget.value)}
                          onKeyPress={(e) => onKeyPressHandler(e)}/>
            </div>
            <div>
                <button onClick={sendMessageX}
                        disabled={status === 'pending'}
                >Send
                </button>
                <div>{
                    status === 'pending'
                        ? 'disabled'
                        : 'undisabled'
                }</div>
            </div>
        </div>
    )
}