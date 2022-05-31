let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}
let ws: WebSocket | null

type EventNemesTypes = 'messages-received' | 'status-changed'
const closeWsHandler = () => {
    console.log('CLOSE WS')
    setTimeout(createChannel, 3000)
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeWsHandler)
    ws?.removeEventListener('message', newMessageHandler)
    ws?.close()
}

function createChannel() {
    cleanUp()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeWsHandler)
    ws?.addEventListener('message', newMessageHandler)
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
    subscribe(eventName:EventNemesTypes, callback: MessagesReceivedSubscriberType|StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(scf => scf !== callback)
        }
    },
    unsubscribe(eventName:EventNemesTypes, callback: MessagesReceivedSubscriberType|StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].filter(scf => scf !== callback)
    },





    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}
export type StatusType = 'pending' | 'ready'