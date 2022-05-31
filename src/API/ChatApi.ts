let subscribers = [] as SubscriberType[]
let ws: WebSocket | null

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
    subscribers.forEach(subsc => subsc(newMessages))
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        cleanUp()
        subscribers = []
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)

        return () => {
            subscribers.filter(scf => scf !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers.filter(scf => scf !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}
