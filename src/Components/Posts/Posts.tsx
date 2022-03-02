import React from "react";
import s from './Posts.module.css'
import {NewPost} from "./NewPost/NewPost";
import {MyPostsType} from "../redux/stote";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../Utils/Validators/validators";
import {Textarea} from "../Common/FormsControls/FormsControls";


type PostsPropsType = {
    myPosts: Array<MyPostsType>
    addPost: (newText: string) => void
    newPostText: string
    updateNewPost: (newText: string) => void
    // isAuth:boolean
}


export class Posts extends React.Component<PostsPropsType> {

    shouldComponentUpdate(nextProps: Readonly<PostsPropsType>, nextState: Readonly<{}>, nextContext: any): boolean {
        return nextState !== this.props && nextState !== this.state
    }

    render() {
        let onAddPost = (values: NewPostFormValuesType) => {
            this.props.addPost(values.newPostText)
        }

        // if (!props.isAuth) return <Navigate to={"/login"}/>
        return (
            <div className={s.content}>
                <NewPost
                    myPosts={this.props.myPosts}
                />
                <AddPostFormRedux onSubmit={onAddPost}/>
            </div>
        )
    }
}

const maxLength10 = maxLengthCreator(10)

export type NewPostFormValuesType = {
    newPostText: string
}
export const AddPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, {}> & {}>
    = (props) => {
    return <>
        <form className={s.teaxtarea} onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newPostText" placeholder='New Post'
                       validate={[required, maxLength10]}/>
            </div>
            <div className={s.button}>
                <button>ADD</button>
                <button>REMOVE</button>
            </div>
        </form>
    </>
}

const AddPostFormRedux = reduxForm<NewPostFormValuesType>({form: 'dialogAddMessageForm'})(AddPostForm)