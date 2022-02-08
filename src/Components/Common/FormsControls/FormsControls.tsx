import React from 'react';
import style from './FormControls.module.css'

const Textarea = ({input, meta, ...props}: any) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            <>
                <textarea {...input} {...props}/>
            </>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export default Textarea;