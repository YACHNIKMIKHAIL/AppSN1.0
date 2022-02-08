import React from 'react';
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../Utils/Validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
const Login = () => {
    const onSubmit = (formData: any) => {
        console.log(formData)
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{color: 'yellow', backgroundColor: 'black', padding: '40px', borderRadius: '20px'}}>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
};

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'login'} name={'login'} component={Input}
                validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={Input}
                validate={[required]}/>
            </div>
            <div>
                <Field type="checkbox" name={'rememberMe'} component={Input}/>Remember me
            </div>
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
export default Login;