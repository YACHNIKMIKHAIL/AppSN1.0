import React from 'react';
import style from './FormControls.module.css'
import {FieldValidatorType} from "../../../Utils/Validators/validators";
import {Field} from "redux-form";

export const Textarea = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
};

export const Input = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/> </FormControl>
};

type FormControlPropsType = {
    input: any
    meta: { touched: boolean, error: string }
    children: React.ReactNode
    element: any
}
export const FormControl: React.FC<FormControlPropsType> = ({input, meta: {touched, error}, children, element, ...props}) => {
    const hasError = touched && error
    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
};

export const createField = (placeholder: string, name: string,
                            validators: FieldValidatorType[], component: string | React.Component | React.FC,
                            props = {}, text = '') => {
    <div>
        <Field placeholder={placeholder} name={name} validators={validators} component={component} {...props}
        />{text}
    </div>
}