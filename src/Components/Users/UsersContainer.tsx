import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/reduxStore";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";

type UsersPagePropsType = {
    pageTitle?: string
}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector<AppStateType, boolean>(state => state.usersPage.isFetching)
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        {props.pageTitle && <h2>{props.pageTitle}</h2>}
        {isFetching
            ? <Preloader/>
            : null
        }
        <Users/>
    </div>
}

