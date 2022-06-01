import {ChatMessageType} from "../Components/redux/chat-reducer";

let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}
let ws: WebSocket | null

type EventNemesTypes = 'messages-received' | 'status-changed'
const closeWsHandler = () => {
    notifySubscribersAboutStatus('pending')

    setTimeout(createChannel, 3000)
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeWsHandler)
    ws?.removeEventListener('message', newMessageHandler)
    ws?.removeEventListener('open', openChannelHandler)
    ws?.removeEventListener('error', errorHandler)
    ws?.close()
}
const openChannelHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Refresh page!')
}
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(ss => ss(status))
}

function createChannel() {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeWsHandler)
    ws?.addEventListener('message', newMessageHandler)
    ws?.addEventListener('open', openChannelHandler)
    ws?.addEventListener('error', errorHandler)
}

const newMessageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(subsc => subsc(newMessages))
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        cleanUp()
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
    },
    subscribe(eventName: EventNemesTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(scf => scf !== callback)
        }
    },
    unsubscribe(eventName: EventNemesTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].filter(scf => scf !== callback)
    },


    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageAPIType = {
    userId: number
    userName: string
    message: string
    photo: string
}
export type StatusType = 'pending' | 'ready' | 'error'