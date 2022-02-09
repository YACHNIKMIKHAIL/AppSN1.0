import React from 'react';
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../Utils/Validators/validators";
import {connect, useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../redux/auth-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Navigate} from "react-router-dom";
import s from './../Common/FormsControls/FormControls.module.css'


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
// type LoginType = {
//     data: FormDataType
//     login: (email: string, password: string, rememberMe?: boolean) => void
// }
const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const onSubmit = (formData: FormDataType) => {
        dispatch(loginThunkCreator(formData.email, formData.password, formData.rememberMe))
    }


    return isAuth
        ? <Navigate to={'/profile'}/>
        : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{color: 'black', padding: '40px', borderRadius: '20px', border: '3px black solid'}}>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
};

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email '} name={'email'} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={Input} type={'password'}
                       validate={[required]}/>
            </div>
            <div>
                <Field type="checkbox" name={'rememberMe'} component={Input}/>Remember me
            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state: AppStateType) => {
    return {isAuth: state.auth.isAuth}
}

export default connect(mapStateToProps, {
    loginThunkCreator
})(Login);