import React from 'react';

const Textarea = ({input, meta, ...props}: any) => {
    return (
        <div>
            <textarea {...input} {...props}/>
        </div>
    );
};

export default Textarea;