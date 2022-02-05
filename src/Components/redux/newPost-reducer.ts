import {ActionsTypes, MyPostsType} from "./stote";

const addPost = 'ADD-POST';

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
        case addPost: {
            return {
                ...state, myPosts: [ ...state.myPosts,{
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

export const addPostAC = (newPostText: string) => {
    return {
        type: 'ADD-POST',newPostText
    } as const
}

export default newPostReducer