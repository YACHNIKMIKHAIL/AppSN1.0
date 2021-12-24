import {ActionsTypes, MyPostsType, StateType} from "./stote";

const addPost = 'ADD-POST';
const updateNewPostText = 'UPDATE-NEW-POST-TEXT';

type InitialType = {
    newPostText: string
    myPosts: Array<MyPostsType>
}
let initialState: InitialType = {
    newPostText:'',
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
            let newPost: MyPostsType = {
                date: new Date().getTime(),
                id: 4,
                text: state.newPostText,
                likecount: 0
            }
            let stateCopy = {...state}
            stateCopy.myPosts = [...state.myPosts]
            stateCopy.myPosts.push(newPost)
            stateCopy.newPostText = ''
            return stateCopy
        }
        case updateNewPostText: {
            let stateCopy = {...state}
            stateCopy.newPostText = action.newText
            return stateCopy
        }

        default :
            return state
    }
}

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

export default newPostReducer