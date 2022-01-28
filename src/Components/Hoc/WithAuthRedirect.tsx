import {Navigate,} from "react-router-dom";
import React, {ComponentType} from "react";
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

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropType) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={"/login"}/>
        return <Component {...restProps as T}/>
    }
    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectComponent
}