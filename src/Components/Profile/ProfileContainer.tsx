import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfileAC} from "../redux/profile-reducer";
import {AppStateType} from "../redux/reduxStore";

class ProfileContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    // componentDidMount() {
    //     let userId = this.props.profile.userId
    //     if (!userId) {
    //         userId = 2
    //     }
    //     axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
    //         .then(response => {
    //             console.log(response.data)
    //             this.props.setUserProfileAC(response.data)
    //         })
    // }

    getProfile = (userId: number) => {
        console.log(userId)
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                console.log(response.data)
                this.props.setUserProfileAC(response.data)
            })
    }

    render() {
        console.log('Profile')
        return <Profile
            getProfile={this.getProfile}
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

// let WithUrlDataContainerComponent=withRouter(ProfileContainer)
// export default connect(mapStateToProps, {setUserProfileAC})(WithUrlDataContainerComponent)
export default connect(mapStateToProps, {setUserProfileAC})(ProfileContainer)
