import React, {useCallback, useEffect} from "react";
import {Profile} from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getProfileThunkCreator, ProfileType} from "../redux/profile-reducer";
import {AppStateType} from "../redux/reduxStore";
import {useParams} from "react-router-dom";

export const ProfileContainer = () => {
    const {userId} = useParams()
    const profile = useSelector<AppStateType, ProfileType>(state => state.profile.profile)
    const dispatch = useDispatch()

    const getProfile =useCallback ((userId: number) => {
        dispatch(getProfileThunkCreator(userId))
    },[dispatch])

    useEffect(() => {
        getProfile(userId ? +userId : 2)
    }, [userId, getProfile])


    return <Profile
        profile={profile}
    />


}

// class ProfileContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
//
//     componentDidMount() {
//         let userId = this.props.profile.userId
//         if (!userId) {
//             userId = 2
//         }
//         this.getProfile(userId)
//     }
//
//     componentDidUpdate(prevProps: Readonly<MapStateToPropsType & MapDispatchToPropsType>, prevState: Readonly<{}>, snapshot?: any) {
//         if(prevProps.profile.userId !== this.props.profile.userId){
//             this.getProfile(prevProps.profile.userId)
//         }
//
//     }
//
//     getProfile = (userId: number) => {
//         console.log(userId)
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
//             .then(response => {
//                 console.log(response.data)
//                 this.props.setUserProfileAC(response.data)
//             })
//     }
//
//     render() {
//         console.log('Profile')
//         return <Profile
//             getProfile={this.getProfile}
//             profile={this.props.profile}
//         />
//     }
// }
//
//
//
// const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
//     profile: state.profile.profile
// })
// type MapStateToPropsType = {
//     profile: ProfileType
// }
// type MapDispatchToPropsType = {
//     profile: ProfileType
//     setUserProfileAC: (profile: ProfileType) => void
// }
//
// // let WithUrlDataContainerComponent=withRouter(ProfileContainer)
// // export default connect(mapStateToProps, {setUserProfileAC})(WithUrlDataContainerComponent)
// export default connect(mapStateToProps, {setUserProfileAC})(ProfileContainer)
