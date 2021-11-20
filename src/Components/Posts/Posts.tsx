import React, {createRef, useState} from "react";
import s from './Posts.module.css'
import {NewPost} from "./NewPost/NewPost";
import {MyPostsType} from "../redux/state";
import {stringify} from "querystring";


type PostsPropsType = {
    myPosts: Array<MyPostsType>
    addPost: (postMessage: string) => void
}
export const Posts = (props: PostsPropsType) => {

    let newPostElement = React.createRef<HTMLInputElement>();

    let addPosts = () => {
        let text = newPostElement.current!.value;
        props.addPost(text)
    }


    return (
        <div className={s.content}>
            <NewPost myPosts={props.myPosts}/>
            <div className={s.newPost}>
                <input type="text"
                       placeholder='My new post'
                       className={s.input}
                       ref={newPostElement}/>
                <div className={s.button}>
                    <button onClick={addPosts}>ADD</button>
                    <button>REMOVE</button>
                </div>
            </div>
        </div>
    )
}

