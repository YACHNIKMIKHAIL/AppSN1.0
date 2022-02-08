import {ActionsTypes} from "./stote";

type MyPostsType = {
    date: number
    id: number
    text: string
    likecount: number
}
type InitialType = {
    myPosts: Array<MyPostsType>
}
let initialState: InitialType = {
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

    ]
}

const newPostReducer = (state = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state, myPosts: [...state.myPosts, {
                    date: new Date().getTime(),
                    id: 4,
                    text: action.newPostText,
                    likecount: 0
                }]
            }
        }
        default :
            return state
    }
}
const ADD_POST = 'ADD_POST';
type addPostACType = {
    type: typeof ADD_POST,
    newPostText: string
}
export const addPostAC = (newPostText: string): addPostACType => {
    return {
        type: ADD_POST, newPostText
    } as const
}

const DELETE_POST = 'DELETE_POST';
type deletePostACType = {
    type: typeof DELETE_POST
}
export const deletePostAC = (): deletePostACType => {
    return {
        type: DELETE_POST
    } as const
}

export default newPostReducer