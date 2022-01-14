import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../redux/auth-reducer";
import {AppStateType} from "../redux/reduxStore";
import {authApi} from "../../API/Api";

class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
        authApi.authMe().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                this.props.setAuthUserDataAC(id, email, login)
            }
        })
    }

    render() {
        return <Header
            isAuth={this.props.isAuth} login={this.props.login}
        />
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {setAuthUserDataAC: setAuthUserData})(HeaderContainer);