import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, LoginFormType} from "../Common/FormsControls/FormsControls";
import {required} from "../../Utils/Validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../redux/auth-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Navigate} from "react-router-dom";
import s from './../Common/FormsControls/FormControls.module.css'

type MapStateToProps = {
    isAuth: boolean
    captchaUrl: string
}
type MapDispatchToProps = {
    loginThunkCreator: (email: string, password: string, rememberMe: boolean) => void
}
const Login: React.FC<MapStateToProps & MapDispatchToProps> = (props) => {
    const onSubmit = (formData: LoginFormType) => {
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe)
    }
    return props.isAuth
        ? <Navigate to={'/profile'}/>
        : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{
                color: 'black',
                padding: '80px',
                borderRadius: '150px',
                border: '15px #D93938 solid',
                backgroundColor: '#D9393864'
            }}>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </div>
        </div>
};


type LoginFormTypeOwnType = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormType, LoginFormTypeOwnType> & LoginFormTypeOwnType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {/*<div>*/}
            {/*    <Field placeholder={'email '} name={'email'} component={Input}*/}
            {/*           validate={[required]}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field placeholder={'password'} name={'password'} component={Input} type={'password'}*/}
            {/*           validate={[required]}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field type="checkbox" name={'rememberMe'} component={Input}/>Remember me*/}
            {/*</div>*/}

            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField(undefined, 'rememberMe', [], Input, {type: 'checkbox'})}


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

const LoginReduxForm = reduxForm<LoginFormType, LoginFormTypeOwnType>({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: 'ffff'
    }
}

export default connect(mapStateToProps, {
    loginThunkCreator
})(Login);