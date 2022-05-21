import React from "react";
import s from './Users.module.css'
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";
import {UserType} from "../../API/UsersApi";
import {ErrorMessage, Field, Form, Formik} from "formik";


type UsersPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => void
    unFollow: (id: number) => void
    followingInProgress: boolean
    followingId: Array<number>
    unFollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
}
export const Users = ({currentPage, onPageChanged, pageSize, totalCount, ...props}: UsersPropsType) => {
    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={s.content}>
            <UserSearchForm/>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalCount={totalCount}
            />
            <div className={s.users}>
                {props.users?.map((m, i) => {
                    return <User user={m} key={i} followThunkCreator={props.followThunkCreator}
                                 unFollowThunkCreator={props.unFollowThunkCreator} followingId={props.followingId}/>
                })}
            </div>
        </div>

    )
}


export const UserSearchForm = () => {
    return (
        <div>
            <Formik
                initialValues={{email: '', password: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="email" name="email"/>
                        <ErrorMessage name="email" component="div"/>
                        <Field type="password" name="password"/>
                        <ErrorMessage name="password" component="div"/>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
