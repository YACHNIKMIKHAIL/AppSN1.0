import React, {useState} from "react";
import s from './Profile.module.css'
import Preloader from "../Common/Preloader/Preloader";
import {ContactsType, ProfileType, saveProfileThunkCreator} from "../redux/profile-reducer";
import userPhoto from "./../../assets/images/images.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {useDispatch} from "react-redux";

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (newPhoto: File) => void
}
export const Profile = (props: ProfilePropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const dispatch = useDispatch()

    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const {length} = e.target.files;
            if (length) {
                props.savePhoto(e.target.files[0])
            }
        }
    }

    const onSubmit = async (formData: ProfileType) => {
        try {
            const res: any = await dispatch(saveProfileThunkCreator(formData))
            if (res) {
                setEditMode(false)
            }
        } catch (e) {
            alert(e)
        }

    }

    return (
        <div className={s.content}>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            {props.profile.fullName}
            <img className={s.mainPhote}
                 src={props.profile.photos?.small || props.profile.photos?.large || userPhoto}
                 alt=""/>
            {props.isOwner && <input type="file" onChange={(e) => onMainPhotoSelected(e)}/>}
            {editMode
                ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => setEditMode(true)}/>}
        </div>

    )
}

type ContactComponentType = {
    contactTitle: string,
    contactValue: any
}
export const Contact = ({contactTitle, contactValue}: ContactComponentType) => {
    return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
}
type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData = (props: ProfileDataType) => {
    return <div className={s.info}>
        {props.isOwner && <div>
            <button onClick={props.goToEditMode}>edit</button>
        </div>}
        <div><b>fullName: </b>
            {props.profile.fullName}</div>
        <div>
            <div>
                <b>lookingForAJob: </b>
                {props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {props.profile.lookingForAJob &&
            <div><b>my professional skills</b>{props.profile.lookingForAJobDescription}</div>}


            <div>
                <b>about me: </b>
                {props.profile.aboutMe}
            </div>
            <div>
                <b>contacts: </b>
                {Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={props.profile.contacts[key as keyof ContactsType]}/>
                })}
            </div>
        </div>
    </div>
}