import React from 'react';
import style from './FormControls.module.css'
import {FieldValidatorType} from "../../../Utils/Validators/validators";
import {Field, WrappedFieldProps} from "redux-form";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/> </FormControl>
};

type FormControlPropsType = {
    input: any
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}
export const FormControl: React.FC<FormControlPropsType> = ({
                                                                input,
                                                                meta: {touched, error},
                                                                children,
                                                                ...props
                                                            }) => {
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

export function  createField<FormKeysType extends string>(placeholder: string | undefined, name: FormKeysType,
                                                         validators: FieldValidatorType[], component: React.FC<WrappedFieldProps>,
                                                         props = {}, text = '') {
    return <div>
        <Field placeholder={placeholder} name={name} validators={validators} component={component} {...props}
        />{text}
    </div>
}