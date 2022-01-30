import React from 'react';
import {reduxForm} from "redux-form";

const Login = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{color: 'yellow', backgroundColor: 'black', padding: '40px', borderRadius: '20px'}}>
                <h1>Login</h1>
                <LoginReduxForm/>
            </div>
        </div>
    );
};

const LoginForm = () => {
    return (
        <form>
            <div>
                <input placeholder={'login'}/>
            </div>
            <div>
                <input placeholder={'password'}/>
            </div>
            <div>
                <input type="checkbox"/>Remember me
            </div>
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)
export default Login;