import React, {ChangeEvent} from "react";
import s from './Posts.module.css'
import {NewPost} from "./NewPost/NewPost";
import {
    addPostAC,
    MyPostsType,
    UpdateNewPostTextAC
} from "../redux/state";


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
        // let text = newPostElement.current!.value;
        // props.dispatch({type: 'ADD-POST', text: text})
        props.dispatch(addPostAC())
    }
    let onPostChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newText = e.currentTarget.value;
        // props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text})
        props.dispatch(UpdateNewPostTextAC(newText))
        console.log(newText)
    }
    return (
        <div className={s.content}>
            <NewPost myPosts={props.myPosts}/>
            <div className={s.newPost}>
                <input type="text"
                       onChange={(e) => onPostChange(e)}
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

