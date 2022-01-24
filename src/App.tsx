import React from 'react';
import './App.css';
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {Messages} from "./Components/Messages/Messages";
import {PostsContainer} from "./Components/Posts/NewPost/PostsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import {ProfileContainer} from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";


function App() {
    return (
        <div className="AppWrapper">
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
        </div>
    );
}

export default App;


