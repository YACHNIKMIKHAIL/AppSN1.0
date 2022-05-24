import React, {Component, Suspense} from 'react';
import './App.css';
import s from './Components/Footer/Footer.module.css'
import {BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {PostsContainer} from "./Components/Posts/NewPost/PostsContainer";
import {UsersPage} from "./Components/Users/UsersContainer";
import {connect, Provider, useSelector} from "react-redux";
import {initializAppThunkCreator} from "./Components/redux/app-reducer";
import store, {AppStateType} from "./Components/redux/reduxStore";
import Preloader from "./Components/Common/Preloader/Preloader";
import {compose} from "redux";
import {LoginPage} from "./Components/Login/LoginPage";
import 'antd/dist/antd.css';
import type {MenuProps} from 'antd';
import {Breadcrumb, Button, Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';

const {Header, Content, Sider} = Layout;

const Messages = React.lazy(() => import('./Components/Messages/Messages'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

type  AppMapPropsType = ReturnType<typeof mapStateToProps>
type  AppDispatchPropsType = {
    initializAppThunkCreator: () => void
}

const items1: MenuProps['items'] = ['Profile', 'Developers', 'Settings'].map(key => ({
    key,
    label: key,
}));


const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const keyS = String(index + 1);
        const key = ['Profile', 'Developers', 'Settings'];
        return {
            key: `sub${keyS}`,
            icon: React.createElement(icon),
            label: key[index],

            children: new Array(3).fill([
                <NavLink to='/AppSN1.0'
                         className={({isActive}) => (isActive ? s.active : '')}>Profile</NavLink>,
                <NavLink to='/messages'
                         className={({isActive}) => (isActive ? s.active : '')}>Messages</NavLink>,
                <NavLink to='/posts'
                         className={({isActive}) => ((isActive ? s.active : ''))}> Posts</NavLink>,
                <NavLink to='/users'
                         className={({isActive}) => ((isActive ? s.active : ''))}> Contacts</NavLink>,
                'bla-bla 2',
                'bla-bla 2',
                '3 blaaa-blaaa',
                '3 blaaa-blaaa',
                '3 blaaa-blaaa'
            ], 0, 3).map((e, j) => {
                const subKey = index * 3 + j;
                return {
                    key: subKey,
                    label: e[subKey],
                };
            }),
        };
    },
);


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
        return (
            //     <div className="AppWrapper">
            //     <HeaderContainer/>
            //     <Routes>
            //         <Route path='/users' element={<Suspense fallback={<h1>Loading...</h1>}>
            //             <UsersPage/>
            //         </Suspense>}/>
            //         <Route path='/messages'
            //                element={<Suspense fallback={<h1>Loading...</h1>}>
            //                    <Messages/>
            //                </Suspense>}/>
            //         <Route path='/posts' element={<PostsContainer/>}/>
            //         <Route path='/profile/:userId'
            //                element={<ProfileContainer/>}/>
            //         <Route path='/AppSN1.0'
            //                element={<Suspense fallback={<h1>Loading...</h1>}>
            //                    <ProfileContainer/>
            //                </Suspense>}/>
            //         <Route path='/login' element={<LoginPage/>}/>
            //         <Route path='*' element={<div>Page not found 404
            //         <Button type={'primary'}>ok</Button>
            //         </div>}/>
            //     </Routes>
            //     <Redirect/>
            //     <Footer/>
            // </div>

            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1}/>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                            items={items2}
                        />
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >

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
                                <Route path='*' element={<div>Page not found 404
                                    <Button type={'primary'}>ok</Button>
                                </div>}/>
                            </Routes>
                            <Redirect/>

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
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