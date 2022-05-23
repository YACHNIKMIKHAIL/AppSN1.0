import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../redux/user-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../redux/users-selectors";

const userSearchFormValidate = () => {
    const errors = {};
    return errors;
}
type FriendFormType = "null" | "true" | "false"
type FormFilterType = {
    term: string
    friend: FriendFormType
}
type UserSearchFormProps = {
    onFilterChanged: (filter: FilterType) => void
}
export const UserSearchForm: React.FC<UserSearchFormProps> = React.memo(({onFilterChanged}) => {
    const filter = useSelector(getUsersFilter)

    const submit = (values: FormFilterType, {setSubmitting}: { setSubmitting: (isSubmiting: boolean) => void }) => {
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
                enableReinitialize //razreshi pereinicialializaciu
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
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
