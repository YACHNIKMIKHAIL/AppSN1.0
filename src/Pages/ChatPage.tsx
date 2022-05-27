import React from 'react';

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
type MessagesType = ChatMessageType[]
const ChatMessages: React.FC = () => {
    const messages: MessagesType = [
        {
            url: 'https://miro.medium.com/max/510/0*-1JzOPdsvY2jDuMu',
            author: 'Sad Guy',
            text: 'dhxvaius`dh digvcaosyuid`hgxc ayd`gfca`dhgf',
        },
    ]

    return (
        <div>
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
            {messages.map((m) => {
                return <ChatMessage message={m}/>
            })}
        </div>
    )
}
type ChatMessageType = {
    url: string
    author: string
    text: string
}
type MessageType = {
    message: ChatMessageType
}
const ChatMessage: React.FC<MessageType> = (props) => {
    const {url, author, text} = props.message
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
            <div >
                <img src={url} alt="hbcahsb" style={{height: '50px', width: '50px', borderRadius: '50%',marginRight:'20px'}}/>
                <b>{author}</b>
            </div>
            <div>
                {text}
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