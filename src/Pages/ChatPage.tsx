import React, {useEffect, useState} from 'react';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

export default ChatPage;

const Chat: React.FC = () => {

    return (
        <div>
            <ChatMessages/>
            <ChatAddMessageForm/>
        </div>
    )
}
type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}
const ChatMessages: React.FC = () => {
    const [messages, setChatMessages] = useState<ChatMessageType[]>([] as ChatMessageType[])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            console.log(e.data)
            let newMessages = JSON.parse(e.data)
            setChatMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])
    return (
        <div style={{height: '400px', overflow: 'auto'}}>
            {messages && messages.map((m) => {
                return <ChatMessage message={m} key={`${m.userId}${m.message}`}/>
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
    const sendMessage = () => {
        debugger
        if (!newMessage) return
        ws.send(newMessage)
        setNewMessage('')
    }
    return (
        <div>
            <div>
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}