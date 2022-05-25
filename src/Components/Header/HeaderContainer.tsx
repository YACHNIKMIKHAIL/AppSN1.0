import React from "react";
// import {Header} from "./Header";
import {connect} from "react-redux";
import {authMeThunkCreator, logoutThunkCreator} from "../redux/auth-reducer";
import {AppStateType} from "../redux/reduxStore";

class HeaderContainer extends React.Component<any, any> {
    // componentDidMount() {
    //     this.props.authMeThunkCreator()
    // }

    // render() {
    //     return <Header
    //         isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logoutThunkCreator}
    //     />
    // }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}
export default connect(mapStateToProps, {authMeThunkCreator,logoutThunkCreator})(HeaderContainer);