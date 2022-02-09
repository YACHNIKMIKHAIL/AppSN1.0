import React, {Component} from 'react';
import './App.css';
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {Messages} from "./Components/Messages/Messages";
import {PostsContainer} from "./Components/Posts/NewPost/PostsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import {ProfileContainer} from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {initializAppThunkCreator} from "./Components/redux/app-reducer";
import {AppStateType} from "./Components/redux/reduxStore";
import Preloader from "./Components/Common/Preloader/Preloader";


// function App() {
//     return (
//         <div className="AppWrapper">
//             <HeaderContainer/>
//             <Routes>
//                 <Route path='/users' element={<UsersContainer/>}/>
//                 <Route path='/messages' element={<Messages/>}/>
//                 <Route path='/posts' element={<PostsContainer/>}/>
//                 <Route path='/profile/:userId' element={<ProfileContainer/>}/>
//                 <Route path='/profile' element={<ProfileContainer/>}/>
//                 <Route path='/login' element={<Login/>}/>
//             </Routes>
//             <Footer/>
//         </div>
//     );
// }

class App extends Component<any, any> {
    componentDidMount() {
        this.props.initializAppThunkCreator()
    }

    render() {
        debugger
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (<div className="AppWrapper">
            <HeaderContainer/>
            <Routes>
                <Route path='/users' element={<UsersContainer/>}/>
                <Route path='/messages' element={<Messages/>}/>
                <Route path='/posts' element={<PostsContainer/>}/>
                <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                <Route path='/profile' element={<ProfileContainer/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
            <Footer/>
        </div>)
    }
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})
export default connect(mapStateToProps, {initializAppThunkCreator})(App);


