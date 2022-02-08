import React, {ChangeEvent} from "react";
import s from './Posts.module.css'
import {NewPost} from "./NewPost/NewPost";
import {MyPostsType} from "../redux/stote";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {NewMessageFormValuesType} from "../Messages/DialogWith/DialogsMessages/DialogsMessages";
import required from "../../Utils/Validators/validators";


type PostsPropsType = {
    myPosts: Array<MyPostsType>
    addPost: (newText: string) => void
    newPostText: string
    updateNewPost: (newText: string) => void
    // isAuth:boolean
}


export const Posts = (props: PostsPropsType) => {

    let onAddPost = (values: NewPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    // if (!props.isAuth) return <Navigate to={"/login"}/>
    return (
        <div className={s.content}>
            <NewPost
                myPosts={props.myPosts}
            />
            <AddPostFormRedux onSubmit={onAddPost}/>
        </div>
    )
}

export type NewPostFormValuesType = {
    newPostText: string
}
export const AddPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, {}> & {}>
    = (props) => {
    return <>
        <form className={s.teaxtarea} onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name="newPostText" placeholder='New Post'
                       validate={[required]}/>
            </div>
            <div className={s.button}>
                <button>ADD</button>
                <button>REMOVE</button>
            </div>
        </form>
    </>
}

const AddPostFormRedux = reduxForm<NewPostFormValuesType>({form: 'dialogAddMessageForm'})(AddPostForm)