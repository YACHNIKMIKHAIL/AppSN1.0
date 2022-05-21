import {Field, Form, Formik, FormikValues} from "formik";
import React from "react";
import {FilterType} from "../redux/user-reducer";

const userSearchFormValidate = (values: FormikValues) => {
    const errors = {};
    return errors;
}


export const UserSearchForm = ({onFilterChanged}: { onFilterChanged: (filter: FilterType) => void }) => {
    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmiting: boolean) => void }) => {
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //
        // }, 400);
        onFilterChanged(values)
        setSubmitting(false)
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
