import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfileThunkCreator, ProfileType} from "../redux/profile-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Navigate, useParams} from "react-router-dom";
import {Profile} from "./Profile";

export const ProfileContainer = () => {
    const {userId} = useParams()
    const profile = useSelector<AppStateType, ProfileType>(state => state.profile.profile)
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const getProfile = useCallback((userId: number) => {
        dispatch(getProfileThunkCreator(userId))
    }, [dispatch])

    useEffect(() => {
        getProfile(userId ? +userId : 2)
    }, [userId, getProfile])


    return isAuth
        ? <Profile profile={profile}/>
        : <Navigate to={"/login"}/>
}

// const AuthRedirectComponent=WithAuthRedirect(<ProfileContainer/>)