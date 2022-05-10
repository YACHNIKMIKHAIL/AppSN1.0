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

export function WithAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent = (props: MapStateToPropType) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={"/login"}/>
        return <WrappedComponent {...restProps as WCP}/>
    }
    return connect(mapStateToProps)(RedirectComponent)
}