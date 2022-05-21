import {Field, Form, Formik, FormikValues} from "formik";
import React from "react";

const userSearchFormValidate = (values: FormikValues) => {
    const errors = {};
    return errors;
}

type userSearchFormType = {
    term: string
}

export const UserSearchForm = () => {
    const submit = (values: userSearchFormType, {setSubmitting}: { setSubmitting: (isSubmiting: boolean) => void }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }

    return (
        <div>
            <Formik
                initialValues={{term: ''}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
