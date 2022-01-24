import React, {ChangeEvent} from "react";
import s from './Posts.module.css'
import {NewPost} from "./NewPost/NewPost";
import {MyPostsType} from './../redux/stote'
import {Navigate} from "react-router-dom";


type PostsPropsType = {
    myPosts: Array<MyPostsType>
    addPost: (newText:string) => void
    newPostText: string
    updateNewPost: (newText: string) => void
    isAuth:boolean
}


export const Posts = (props: PostsPropsType) => {

    let onAddPost = () => {
        props.addPost(props.newPostText)
    }
    let onPostChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newText = e.currentTarget.value;

        props.updateNewPost(newText)
        console.log(newText)
    }

    if (!props.isAuth) return <Navigate to={"/login"}/>
    return (
        <div className={s.content}>
            <NewPost
                myPosts={props.myPosts}
            />
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

