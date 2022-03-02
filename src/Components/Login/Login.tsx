import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
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

export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
}
type LoginFormValuseTypeKeys = Extract<keyof LoginFormType, string>


const Login: React.FC<MapStateToProps & MapDispatchToProps> = ({loginThunkCreator, isAuth, captchaUrl}) => {
    const onSubmit = (formData: LoginFormType) => {
        loginThunkCreator(formData.email, formData.password, formData.rememberMe)
    }
    return isAuth
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
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
            </div>
        </div>
};


type LoginFormTypeOwnType = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormType, LoginFormTypeOwnType> & LoginFormTypeOwnType> = ({
                                                                                                                handleSubmit,
                                                                                                                error
                                                                                                            }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuseTypeKeys>('Email', 'email', [required], Input)}
            {createField<LoginFormValuseTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
            {createField<LoginFormValuseTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, "Remember me")}
            {error && <div className={s.formSummaryError}>
                {error}
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