import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfileThunkCreator,
    getStatusThunkCreator,
    ProfileType, savePhotoThunkCreator,
    updateStatusThunkCreator
} from "../redux/profile-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Navigate, useParams} from "react-router-dom";
import {Profile} from "./Profile";

const ProfileContainer = () => {

    const {userId} = useParams()
    const profile = useSelector<AppStateType, ProfileType>(state => state.profile.profile)
    const status = useSelector<AppStateType, string>(state => state.profile.status)
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const getProfile = useCallback((userId: number) => {
        dispatch(getProfileThunkCreator(userId))
    }, [dispatch])
    const getStatus = useCallback((userId: number) => {
        dispatch(getStatusThunkCreator(userId))
    }, [dispatch])
    const updateStatus = useCallback((status: string) => {
        dispatch(updateStatusThunkCreator(status))
    }, [dispatch])

    const savePhoto = (newPhoto: File) => {
        dispatch(savePhotoThunkCreator(newPhoto))
    }

    useEffect(() => {
        getProfile(userId ? +userId : 21487)
        getStatus(userId ? +userId : 21487)
    }, [userId, getProfile, getStatus])

    return isAuth
        ?
        <Profile profile={profile} status={status} updateStatus={updateStatus} isOwner={!userId} savePhoto={savePhoto}/>
        : <Navigate to={"/login"}/>

}

export default ProfileContainer;
// const AuthRedirectComponent=WithAuthRedirect(<ProfileContainer/>)