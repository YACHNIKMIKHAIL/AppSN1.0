import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {PostsContainer} from "./Components/Posts/NewPost/PostsContainer";
import {UsersPage} from "./Components/Users/UsersContainer";
import {Provider, useDispatch, useSelector} from "react-redux";
import {initializAppThunkCreator} from "./Components/redux/app-reducer";
import store, {AppStateType} from "./Components/redux/reduxStore";
import Preloader from "./Components/Common/Preloader/Preloader";
import {LoginPage} from "./Components/Login/LoginPage";
import 'antd/dist/antd.css';
import {Breadcrumb, Button, Layout, Menu, MenuProps} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {createBrowserHistory} from "history"
import {RoutesPath} from "./RoutesPath";
import {HeaderComponent} from "./Components/Header/Header";
import GamePage from "./Pages/GamePage";
import GitPage from "./Pages/GitPage";

const {Content, Sider} = Layout;

const Messages = React.lazy(() => import('./Components/Messages/Messages'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./Pages/ChatPage'));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const keyS = String(index + 1);
        const key = ['Profile', 'Developers', 'Settings'];
        return {
            key: `sub${keyS}`,
            icon: React.createElement(icon),
            label: key[index],

            children: new Array(3).fill([
                <Link to={RoutesPath.profile}>Profile</Link>,
                <Link to={RoutesPath.messages}>Messages</Link>,
                <Link to={RoutesPath.posts}> Posts</Link>,
                <Link to={RoutesPath.developers}> Contacts</Link>,
                <Link to={RoutesPath.chatPage}> C H A T</Link>,
                <Link to={RoutesPath.gamePage}> Game Page</Link>,
                <Link to={RoutesPath.gitPage}> Git Page</Link>,
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
export const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppG/>
        </Provider>
    </BrowserRouter>
}

export type PairArrayType = Array<[number, number]>

export const AppG = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    const [openedKey, setOpenedKey] = useState<number>(0)
    const params = createBrowserHistory()

    const catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert(`Some error occurred: ${promiseRejectionEvent}`)
    }

    const pairArray: PairArrayType = [
        [12, 66],
        [3, 66],
        [57, 424],
        [657, 66],
        [423, 66],
        [765, 423],
        [4, 545],
    ]

    useEffect(() => {
        const {pathname} = params.location
        pathname === RoutesPath.profile
            ? setOpenedKey(0)
            : pathname === RoutesPath.messages
                ? setOpenedKey(1)
                : pathname === RoutesPath.posts
                    ? setOpenedKey(2)
                    : pathname === RoutesPath.developers
                        ? setOpenedKey(3) :
                        pathname === RoutesPath.chatPage
                            ? setOpenedKey(4)
                            : pathname === RoutesPath.gamePage
                                ? setOpenedKey(6)
                                : pathname === RoutesPath.gitPage
                                    ? setOpenedKey(7)
                                    : setOpenedKey(0)
    }, [])

    useEffect(() => {
        dispatch(initializAppThunkCreator())
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)

        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
        }
    }, [])

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <Layout>
            <HeaderComponent/>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[openedKey.toString()]}
                        // defaultOpenKeys={['sub1']}
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
                            <Route path={RoutesPath.developers} element={<Suspense fallback={<h1>Loading...</h1>}>
                                <UsersPage/>
                            </Suspense>}/>
                            <Route path={RoutesPath.messages}
                                   element={<Suspense fallback={<h1>Loading...</h1>}>
                                       <Messages/>
                                   </Suspense>}/>
                            <Route path={RoutesPath.posts} element={<PostsContainer/>}/>
                            <Route path={RoutesPath.profileWithID}
                                   element={<Suspense fallback={<h1>Loading...</h1>}>
                                       <ProfileContainer/>
                                   </Suspense>}/>
                            <Route path={RoutesPath.profile}
                                   element={<Suspense fallback={<h1>Loading...</h1>}>
                                       <ProfileContainer/>
                                   </Suspense>}/>
                            <Route path={RoutesPath.login} element={<LoginPage/>}/>
                            <Route path={RoutesPath.chatPage} element={
                                <Suspense fallback={<h1>Loading...</h1>}><ChatPage/>
                                </Suspense>}/>
                            <Route path={RoutesPath.gamePage} element={
                                <Suspense fallback={<h1>Loading...</h1>}><GamePage pairArray={pairArray}/>
                                </Suspense>}/>
                            <Route path={RoutesPath.gitPage} element={
                                <Suspense fallback={<h1>Loading...</h1>}><GitPage/>
                                </Suspense>}/>
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


export const Redirect = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const isLoggedIn = useSelector<AppStateType, string | null>(state => state.auth.login)

    if (isLoggedIn === null && pathname !== RoutesPath.login) {
        navigate(RoutesPath.login)
    }

    return <div>

    </div>
}