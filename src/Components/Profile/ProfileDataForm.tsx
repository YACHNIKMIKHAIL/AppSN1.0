import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../Common/FormsControls/FormsControls";
import {ProfileType} from "../../API/ProfileApi";

const ProfileDataForm: FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({
                                                                                                                      profile,
                                                                                                                      handleSubmit,
                                                                                                                      error
                                                                                                                  }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
                {error && <div>{error}</div>}
            </div>
            <div>
                <b>Full name</b>:
                {createField("Full name", "fullname", [], Input, {type: "text"}, "")}
            </div>
            <div>
                <b>Looking for a job</b>:
                {createField("", "lookingForAJob", [], Input, {type: "checkbox"}, "")}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea, {type: "textarea"}, "")}
            </div>
            <div>
                <b>About me</b>:
                {createField("About me", "aboutMe", [], Textarea, {type: "textarea"}, "")}
            </div>
            <div>
                <b>Contacts</b>: {
                Object
                    .keys(profile.contacts)
                    .map(key => {
                        return (
                            <div key={key}>
                                <b>{key} :{createField(key, `contacts.${key}`, [], Input, {type: "text"}, "")}</b>
                            </div>
                        )
                    })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({form: 'editProfile'})(ProfileDataForm)

export default ProfileDataFormReduxForm

//types======
export type ProfileDataFormPropsType = {
    profile: ProfileType
}