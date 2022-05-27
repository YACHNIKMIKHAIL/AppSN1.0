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
    const [chatMessages, setChatMessages] = useState<MessagesType | undefined>()

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            console.log(e.data)
            setChatMessages(JSON.parse(e.data))
        })
    }, [])
    return (
        <div>
            <ChatMessages messages={chatMessages}/>
            <ChatAddMessageForm/>
        </div>
    )
}
type MessagesType = ChatMessageType[] | undefined
type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}
type MessageType = {
    message: ChatMessageType
}

const ChatMessages: React.FC<{ messages: MessagesType }> = ({messages}) => {

    return (
        <div style={{height: '400px', overflow: 'auto'}}>
            {messages && messages.map((m) => {
                return <ChatMessage message={m} key={m.userId}/>
            })}
        </div>
    )
}

const ChatMessage: React.FC<MessageType> = (props) => {
    const {userName, message, photo} = props.message
    return (
        <div style={{
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: 'rgba(194,193,193,0.51)'
        }}>
            <div>
                <img src={photo} alt="hbcahsb"
                     style={{height: '50px', width: '50px', borderRadius: '50%', marginRight: '20px'}}/>
                <b>{userName}</b>
            </div>
            <div>
                {message}
            </div>
        </div>
    )
}
const ChatAddMessageForm: React.FC = () => {
    return (
        <div>
            <div>
                <textarea name="" id=""/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </div>
    )
}