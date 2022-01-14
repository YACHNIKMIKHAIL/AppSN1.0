import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {setUserProfileAC} from "../redux/profile-reducer";

class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {

            })
    }

    render() {
        return <Header/>
    }
}

export default HeaderContainer;