import img1 from './../Images/avas/images (1).jpeg'
import img2 from './../Images/avas/images.jpeg'
import {RerenderEntireTreePropsType} from "../../index";


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
}
export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubsriber: (props: RerenderEntireTreePropsType) => void
    // addPost: () => void
    // updateNewPost: (newText: string) => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof UpdateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendNewMessageAC>

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export const UpdateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}

export const updateNewMessageBodyAC = (body: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        body: body
    } as const
}

export const sendNewMessageAC = () => {
    return {
        type: 'SEND-NEW-MESSAGE'
    } as const
}


const addPost = 'ADD-POST';
const updateNewPostText = 'UPDATE-NEW-POST-TEXT';
const updateNewMessageBody = 'UPDATE-NEW-MESSAGE-TEXT';
const sendNewMessage = 'SEND-NEW-MESSAGE';

export let store: StoreType = {
    _state: {
        newPostText: 'My new POST!',
        myPosts: [
            // {
            //     id: 1,
            //     text: " But where to start",
            //     likecount: 76
            // },
            // {
            //     id: 2,
            //     text: "actory is an American  se posts get a lot of ",
            //     likecount: 46
            // },
            // {
            //     id: 3,
            //     text: "und the world. But whathat’s on the me",
            //     likecount: 32
            // }

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
                        {id: 1, title: '1 not working due to missing reference to NvModuleTracker'},
                        {id: 3, title: '3 not working due to missing reference to NvModuleTracker'},
                        {id: 6, title: '6 Shadorking due to missing reference to NvModuleTracker'},
                        {id: 7, title: '7 missing reference to NvModuleTracker'},
                        {id: 9, title: '9 not working due to missing reference to NvModuleTracker'},
                    ],
                    friendMess: [
                        {id: 2, title: '2 not working due to missing reference to NvModuleTracker'},
                        {id: 4, title: ' 4 working due to missing reference to NvModuleTracker'},
                        {id: 5, title: '5 working due to missing reference to NvModuleTracker'},
                        {id: 8, title: '8 not working due to missing reference to NvModuleTracker'},
                        {id: 10, title: '10 not working due to missing reference to NvModuleTracker'}
                    ],
                },
                newMessageBody: ''
            },

    },
    _callSubsriber(props: RerenderEntireTreePropsType) {
        console.log('My name is PAIN!!!')
    },
    getState() {
        return this._state;
    },
    subscribe(observer: () => void) {
        this._callSubsriber = observer
    },
    // _addPost() {
    //     let newPost: MyPostsType = {
    //         id: 5,
    //         text: this._state.newPostText,
    //         likecount: 0
    //     }
    //     this._state.myPosts.push(newPost)
    //     this._state.newPostText = ''
    //     this._callSubsriber({State: this._state})
    // },
    // _updateNewPost(newText: string) {
    //     this._state.newPostText = newText
    //     this._callSubsriber({State: this._state})
    // },
    dispatch(action) {
        if (action.type === addPost) {
            let newPost: MyPostsType = {
                date: new Date().getTime(),
                id: new Date().getTime(),
                text: this._state.newPostText,
                likecount: 0
            }
            this._state.myPosts.push(newPost)
            this._state.newPostText = ''
            this._callSubsriber({State: this._state})
        } else if (action.type === updateNewPostText) {
            this._state.newPostText = action.newText
            this._callSubsriber({State: this._state})
        } else if (action.type === updateNewMessageBody) {
            this._state.myFriends.newMessageBody = action.body
            this._callSubsriber({State: this._state})
        } else if (action.type === sendNewMessage) {
            let boby = this._state.myFriends.newMessageBody
            this._state.myFriends.newMessageBody = ''
            this._state.myFriends.messages.myMess.push({id: 11, title: boby})
            this._callSubsriber({State: this._state})
        }
    }
}



