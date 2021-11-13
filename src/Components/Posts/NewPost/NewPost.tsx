import s from "./NewPost.module.css";
import React from "react";
import {MyPostsType} from "../../redux/state";

type NewPostPrposType={
    myPosts:Array<MyPostsType>
}
export const NewPost=(props: NewPostPrposType)=> {
    let post=props.myPosts.map((pp)=>{
        return (
            <div className={s.post}>
                <div className={s.postText}>
                    {pp.text}
                </div>
                <div className={s.likes}>
                    likes:6
                </div>
            </div>
        )
    })


    return (
        <div>
            {post}
        </div>
    )
}