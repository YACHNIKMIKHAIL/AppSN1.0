const subscribers = [] as SubscriberType[]
export const chatApi = {
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
    }
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}
