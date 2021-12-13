import img1 from './../Images/avas/images (1).jpeg'
import img2 from './../Images/avas/images.jpeg'
import img3 from './../Images/avas/images (2).jpeg'
import img4 from './../Images/avas/images (3).jpeg'
import {RerenderEntireTreePropsType} from "../../index";


export type MyPostsType = {
    date:number
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
    myFriends: Array<MyFriendsType>
}
export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubsriber: (props: RerenderEntireTreePropsType) => void
    // addPost: () => void
    // updateNewPost: (newText: string) => void
    subscribe: (observer: any) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = ReturnType<typeof addPostAC> | ReturnType<typeof UpdateNewPostTextAC>

const addPostAC = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        newPostText: newPostText
    } as const
}

const UpdateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}



const addPost = 'ADD-POST';
const updateNewPostText = 'UPDATE-NEW-POST-TEXT';

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
        myFriends: [
            {
                img: img2,
                id: 1, name: 'Kolia',
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
                    ]
                }
            },
            {
                img: img1,
                id: 2, name: 'Igor',
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
                        {id: 4, title: '4 not working due to missing reference to NvModuleTracker'},
                        {id: 5, title: '5 working due to missing reference to NvModuleTracker'},
                        {id: 8, title: '8 not working due to missing reference to NvModuleTracker'},
                        {id: 10, title: '10 not working due to missing reference to NvModuleTracker'}
                    ]
                }
            },
            {
                img: img3,
                id: 3, name: 'Vitalia',
                messages: {
                    myMess: [
                        {id: 1, title: '1 not working due to missing reference to NvModuleTracker'},
                        {id: 3, title: '3 not working due to missing reference to NvModuleTracker'},
                        {id: 6, title: '6 Shadorking due to missing reference to NvModuleTracker'},
                        {id: 7, title: '7 missing reference to NvModuleTracker'},
                        {id: 9, title: '9 not working due to missing reference to NvModuleTracker'},
                    ],
                    friendMess: [
                        {id: 2, title: '1 not working due to missing reference to NvModuleTracker'},
                        {id: 4, title: '4 not working due to missing reference to NvModuleTracker'},
                        {id: 5, title: '5 working due to missing reference to NvModuleTracker'},
                        {id: 8, title: '8 not working due to missing reference to NvModuleTracker'},
                        {id: 10, title: '10 to missing reference to NvModuleTracker'}
                    ]
                }
            },
            {
                img: img4,
                id: 4, name: 'Egor',
                messages: {
                    myMess: [
                        {id: 1, title: '1 nossing reference to NvModuleTracker'},
                        {id: 3, title: '3 not wissing reference to NvModuleTracker'},
                        {id: 6, title: '6 due to missing reference to NvModuleTracker'},
                        {id: 7, title: '7 e to NvModuleTracker'},
                        {id: 9, title: '9 due to missing reference to NvModuleTracker'},
                    ],
                    friendMess: [
                        {id: 2, title: '2 due to missing reference to NvModuleTracker'},
                        {id: 4, title: '4 ue to missing reference to NvModuleTracker'},
                        {id: 5, title: '5 reference to NvModuleTracker'},
                        {id: 8, title: '8 to missing reference to NvModuleTracker'},
                        {id: 10, title: '10 missing reference to NvModuleTracker'}
                    ]
                }
            },
        ],

    },
    _callSubsriber(props: RerenderEntireTreePropsType) {
        console.log('My name is PAIN!!!')
    },
    getState() {
        return this._state;
    },
    subscribe(observer: any) {
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
        }
    }
}

export const addPostsActionCreator = () => {
    return {
        type: addPost
    }
}
export const onPostChangeActionCreator = (newText:string) => {
    return {
        type: {type: updateNewPostText, newText: newText}
    }
}

