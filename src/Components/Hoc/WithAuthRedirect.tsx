import {Navigate,} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/reduxStore";

type MapStateToPropType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStateToPropType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const WithAuthRedirect = (Component: any) => {
    const RedirectComponent = (props: any) => {
        if (!props.isAuth) return <Navigate to={"/login"}/>
        return <Component {...props}/>
    }
    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectComponent
}