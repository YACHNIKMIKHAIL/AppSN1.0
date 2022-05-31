import React, {useEffect, useState} from 'react';
import {ChatMessageType} from "../API/ChatApi";


const ChatPage = () => {
    const [wsCannel, setWsCannel] = useState<WebSocket | null>(null)


    useEffect(() => {
        let ws: WebSocket

        const closeWsHandler = () => {
            createChannel()
        }

        function createChannel() {
            // if (ws) {
            ws?.removeEventListener('close', closeWsHandler)
            ws?.close()
            // }

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws?.addEventListener('close', closeWsHandler)
            setWsCannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeWsHandler)
            ws.close()
        }
    }, [])


    return (
        <div>
            <Chat wsCannel={wsCannel}/>
        </div>
    );
};

export default ChatPage;

const Chat: React.FC<{ wsCannel: WebSocket | null }> = ({wsCannel}) => {

    return (
        <div>
            <ChatMessages wsCannel={wsCannel}/>
            <ChatAddMessageForm wsCannel={wsCannel}/>
        </div>
    )
}

const ChatMessages: React.FC<{ wsCannel: WebSocket | null }> = ({wsCannel}) => {
    const [messages, setChatMessages] = useState<ChatMessageType[]>([] as ChatMessageType[])

    useEffect(() => {
        const newMessageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setChatMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        wsCannel?.addEventListener('message', newMessageHandler)

        return () => {
            wsCannel?.removeEventListener('message', newMessageHandler)
        }
    }, [wsCannel])
    return (
        <div style={{height: '400px', overflow: 'auto'}}>
            {messages && messages.map((m, i) => {
                return <ChatMessage message={m} key={`${m.userId}${m.message}${i}`}/>
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
const ChatAddMessageForm: React.FC<{ wsCannel: WebSocket | null }> = ({wsCannel}) => {
    const [newMessage, setNewMessage] = useState<string>('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const sendMessage = () => {
        if (!newMessage) return
        wsCannel?.send(newMessage)
        setNewMessage('')
    }

    useEffect(() => {
        const openChannelHandler = () => {
            setReadyStatus('ready')
        }

        wsCannel?.addEventListener('open', openChannelHandler)

        return () => {
            wsCannel?.removeEventListener('open', openChannelHandler)
        }
    }, [wsCannel])
    return (
        <div>
            <div>
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={sendMessage} disabled={wsCannel === null || readyStatus === 'pending'}>Send</button>
                <div>{
                    readyStatus === 'pending'
                        ? 'disabled'
                        : 'undisabled'
                }</div>
            </div>
        </div>
    )
}