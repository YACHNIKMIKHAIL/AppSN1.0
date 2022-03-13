import React, {Component, Suspense} from 'react';
import './App.css';
import {Footer} from "./Components/Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PostsContainer} from "./Components/Posts/NewPost/PostsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializAppThunkCreator} from "./Components/redux/app-reducer";
import store, {AppStateType} from "./Components/redux/reduxStore";
import Preloader from "./Components/Common/Preloader/Preloader";
import {compose} from "redux";

const Messages = React.lazy(() => import('./Components/Messages/Messages'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

class App extends Component<any, any> {
    componentDidMount() {
        this.props.initializAppThunkCreator()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (<div className="AppWrapper">
            <HeaderContainer/>
            <Routes>
                <Route path='/users' element={<Suspense fallback={<h1>Loading...</h1>}>
                    <UsersContainer
                        pageTitle={'Samurai hello! Denis RESPECT!!!'}/>
                </Suspense>}/>
                <Route path='/messages'
                       element={<Suspense fallback={<h1>Loading...</h1>}>
                           <Messages/>
                       </Suspense>}/>
                <Route path='/posts' element={<PostsContainer/>}/>
                <Route path='/profile/:userId'
                       element={<ProfileContainer/>}/>
                <Route path='/AppSN1.0'
                       element={<Suspense fallback={<h1>Loading...</h1>}>
                           <ProfileContainer/>
                       </Suspense>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
            <Footer/>
        </div>)
    }
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})
// export default connect(mapStateToProps, {initializAppThunkCreator})(App);
const AppContainer = compose(connect(mapStateToProps, {initializAppThunkCreator}))(App)

export const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}