import img1 from './../Images/avas/images (1).jpeg'
import img2 from './../Images/avas/images.jpeg'
import {addPostAC, deletePostAC, deletePostACType} from "./newPost-reducer";
import {sendNewMessageAC} from "./newMessage-reducer";
import {UserType} from "./user-reducer";
import {getStatusAC, setStatusAC, setUserProfileAC, updateStatusAC} from "./profile-reducer";
import {setAuthUserData} from "./auth-reducer";


export type MyPostsType = {
    date: number
    id: number
    text: string
    likecount: number
}
export type NameType = {
    title: string
    first: string
    last: string
}
export type LocationType = {
    street: string
    city: string
    state: string
}
export type DobType = {
    date: string
    age: number
}
export type MyInfoType = {
    avatar: string
    gender: string
    name: NameType
    location: LocationType
    email: string
    dob: DobType
    phone: string
}
export type MyFriendsType = {
    img: string
    id: number
    name: string
    messages: MessagesType
    newMessageBody: string
}
export  type MyMessType = {
    id: number
    title: string
}
export  type friendMessType = {
    id: number
    title: string
}
export type MessagesType = {
    myMess: Array<MyMessType>
    friendMess: Array<friendMessType>
}
export type StateType = {
    newPostText: string
    myPosts: Array<MyPostsType>
    MyInfo: MyInfoType
    myFriends: MyFriendsType
    users: Array<UserType>
}
export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubsriber: (state: StateType) => void
    subscribe: (observer: any) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof sendNewMessageAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof updateStatusAC>
    | ReturnType<typeof deletePostAC>


export let store: StoreType = {
    _state: {
        users: [],
        newPostText: 'My new POST!',
        myPosts: [
            {
                date: new Date().getTime(),
                id: 1,
                text: " But where to start",
                likecount: 76
            },
            {
                date: new Date().getTime(),
                id: 2,
                text: "actory is an American  se posts get a lot of ",
                likecount: 46
            },
            {
                date: new Date().getTime(),
                id: 3,
                text: "und the world. But whathat’s on the me",
                likecount: 32
            }

        ],
        MyInfo: {
            avatar: img1,
            gender: "male",
            name: {
                title: "mr",
                first: "brad",
                last: "gibson"
            },
            location: {
                street: "9278 new road",
                city: "kilcoole",
                state: "waterford"
            },
            email: "brad.gibson@example.com",
            dob: {
                date: "1993-07-20T09:44:18.674Z",
                age: 26
            },
            phone: "011-962-7516",
        },
        myFriends:
            {
                img: img2,
                id: 1,
                name: 'Vitalya',
                messages: {
                    myMess: [
                        {id: 1, title: '1 not working due to missing reference to NvModuleTracker'}
                    ],
                    friendMess: [
                        {id: 2, title: '2 not working due to missing reference to NvModuleTracker'}
                    ],
                },
                newMessageBody: ''
            },

    },
    _callSubsriber(state: StateType) {
        console.log('My name is PAIN!!!')
    },
    getState() {
        return this._state;
    },
    subscribe(observer: () => void) {
        this._callSubsriber = observer
    },

    dispatch(action) {
        this._callSubsriber(this._state)
    }
}



