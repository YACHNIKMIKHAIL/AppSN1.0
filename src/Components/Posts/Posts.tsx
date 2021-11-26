import React from "react";
import s from './Posts.module.css'
import {NewPost} from "./NewPost/NewPost";
import {MyPostsType} from "../redux/state";


type PostsPropsType = {
    myPosts: Array<MyPostsType>
    // addPost: (text:string) => void
    newPostText: string
    // updateNewPost:(newText:string)=>void
    dispatch: (action: any) => void
}
export const Posts = (props: PostsPropsType) => {

    let newPostElement = React.createRef<HTMLInputElement>();

    let addPosts = () => {
        let text = newPostElement.current!.value;
        props.dispatch({type: 'ADD-POST', text: text})
    }
    let onPostChange = () => {
        let text = newPostElement.current!.value;
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text})
        console.log(text)
    }

    return (
        <div className={s.content}>
            <NewPost myPosts={props.myPosts}/>
            <div className={s.newPost}>
                <input type="text"
                       onChange={onPostChange}
                       value={props.newPostText}
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

