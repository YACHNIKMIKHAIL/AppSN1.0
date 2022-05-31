let subscribers = [] as SubscriberType[]
let ws: WebSocket

const closeWsHandler = () => {
    createChannel()
}

function createChannel() {
    ws?.removeEventListener('close', closeWsHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeWsHandler)
}

const newMessageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(subsc => subsc(newMessages))
}

export const chatApi = {
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)

        return () => {
            subscribers.filter(scf => scf !== callback)
        }
    },
    unsubscribe(callback: SubscriberType ) {
        subscribers.filter(scf => scf !== callback) 
    }
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}
