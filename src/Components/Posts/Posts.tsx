import React from "react";
import s from './Posts.module.css'
import {NewPost} from "./NewPost/NewPost";
import {MyPostsType, StateType} from "../redux/state";

type PostsPropsType={
    myPosts:Array<MyPostsType>
}
export const Posts = (props:PostsPropsType) => {
    return (
        <div className={s.content}>
           <NewPost myPosts={props.myPosts}/>
            <div className={s.newPost}>
                <input type="text" placeholder='My new post'/>
                <button>ADD</button> <button>REMOVE</button>
            </div>
        </div>
    )
}

