import React, {ChangeEvent} from "react";
import s from './Posts.module.css'
import {NewPost} from "./NewPost/NewPost";
import {
    addPostAC,
    UpdateNewPostTextAC
} from "../redux/newPost-reducer";
import {MyPostsType} from './../redux/stote'


type PostsPropsType = {
    myPosts: Array<MyPostsType>
    addPost: () => void
    newPostText: string
    updateNewPost: (newText: string) => void
    // dispatch: (action: any) => void
}


export const Posts = (props: PostsPropsType) => {

    let onAddPost = () => {
        props.addPost()
    }
    let onPostChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newText = e.currentTarget.value;
        props.updateNewPost(newText)
        // props.dispatch(UpdateNewPostTextAC(newText))
        console.log(newText)
    }
    return (
        <div className={s.content}>
            <NewPost myPosts={props.myPosts}/>
            <div className={s.newPost}>
                <input type="text"
                       onChange={(e) => onPostChange(e)}
                       value={props.newPostText}
                       className={s.input}/>
                <div className={s.button}>
                    <button onClick={onAddPost}>ADD</button>
                    <button>REMOVE</button>
                </div>
            </div>
        </div>
    )
}

