import React, {Component, Suspense} from 'react';
import './App.css';
import {Footer} from "./Components/Footer/Footer";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {PostsContainer} from "./Components/Posts/NewPost/PostsContainer";
import {UsersPage} from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {connect, Provider, useSelector} from "react-redux";
import {initializAppThunkCreator} from "./Components/redux/app-reducer";
import store, {AppStateType} from "./Components/redux/reduxStore";
import Preloader from "./Components/Common/Preloader/Preloader";
import {compose} from "redux";
import {LoginPage} from "./Components/Login/LoginPage";

const Messages = React.lazy(() => import('./Components/Messages/Messages'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

type  AppMapPropsType = ReturnType<typeof mapStateToProps>
type  AppDispatchPropsType = {
    initializAppThunkCreator: () => void
}

class App extends Component<AppMapPropsType & AppDispatchPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert(`Some error occurred: ${promiseRejectionEvent}`)
    }

    componentDidMount() {
        this.props.initializAppThunkCreator()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)

    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (<div className="AppWrapper">
            <HeaderContainer/>
            <Routes>
                <Route path='/users' element={<Suspense fallback={<h1>Loading...</h1>}>
                    <UsersPage/>
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
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='*' element={<div>Page not found 404 </div>}/>
            </Routes>
            <Redirect/>
            <Footer/>

        </div>)
    }
}

export const Redirect = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const isLoggedIn = useSelector<AppStateType, string | null>(state => state.auth.login)

    if (isLoggedIn === null && pathname !== '/login') {
        navigate('/login')
    }

    return <div>

    </div>
}
const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})
const AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {initializAppThunkCreator}))(App)

export const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}