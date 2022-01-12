import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {InitialProfileType, ProfileType, setUserProfileAC} from "../redux/profile-reducer";
import {AppStateType} from "../redux/reduxStore";

class ProfileContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0//profile/2`)
            .then(response => {
                console.log(response.data)
                this.props.setUserProfileAC(response.data)
            })
    }

    render() {
        console.log('Profile')
        return <Profile
            profile={this.props.profile}
        />
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profile.profile
})
type MapStateToPropsType = {
    profile: ProfileType
}
type MapDispatchToPropsType = {
    setUserProfileAC: (profile: ProfileType) => void
}

export default connect(mapStateToProps, {setUserProfileAC})(ProfileContainer)
