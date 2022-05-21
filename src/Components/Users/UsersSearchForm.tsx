import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../redux/user-reducer";

const userSearchFormValidate = () => {
    const errors = {};
    return errors;
}
type FormFilterType = {
    term: string
    friend: "null" | "true" | "false"
}
type UserSearchFormProps = {
    onFilterChanged: (filter: FilterType) => void
}
export const UserSearchForm: React.FC<UserSearchFormProps> = React.memo(({onFilterChanged}) => {
    const submit = (values: FormFilterType, {setSubmitting}: { setSubmitting: (isSubmiting: boolean) => void }) => {
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //
        // }, 400);
        let convertedValues = {
            term: values.term,
            friend: values.friend === 'null'
                ? null
                : values.friend === 'true'
                    ? true
                    : false
        }


        onFilterChanged(convertedValues)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>

                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Friends</option>
                            <option value="false">No friends</option>
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
