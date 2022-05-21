import {Field, Form, Formik, FormikValues} from "formik";
import React from "react";
import {FilterType} from "../redux/user-reducer";

const userSearchFormValidate = (values: FormikValues) => {
    const errors = {};
    return errors;
}

type UserSearchFormProps = {
    onFilterChanged: (filter: FilterType) => void
}
export const UserSearchForm: React.FC<UserSearchFormProps> = React.memo(({onFilterChanged}) => {
    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmiting: boolean) => void }) => {
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //
        // }, 400);
        onFilterChanged(values )
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: null}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>

                        <Field name="friend" as="select">
                            <option value="all">All</option>
                            <option value="friends">Friends</option>
                            <option value="noFriends">No friends</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
