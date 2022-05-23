import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FilterType, getUsersThunkCreator} from "../redux/user-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";

type UsersPagePropsType = {
    pageTitle?:string
}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const dispatch = useDispatch()
    const pageSize=useSelector<AppStateType,number>(state=>state.usersPage.pageSize)
    const filter=useSelector<AppStateType,FilterType>(state=>state.usersPage.filter)
    const isFetching=useSelector<AppStateType,boolean>(state=>state.usersPage.isFetching)
    const currentPage=useSelector<AppStateType,number>(state=>state.usersPage.currentPage)


    useEffect(()=>{
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    },[])
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        {props.pageTitle && <h2>{props.pageTitle}</h2>}
        {isFetching
            ? <Preloader/>
            : null
        }
        <Users />
    </div>
}

