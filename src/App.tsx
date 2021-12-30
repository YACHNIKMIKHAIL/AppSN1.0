import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {Messages} from "./Components/Messages/Messages";
import {PostsContainer} from "./Components/Posts/NewPost/PostsContainer";
import UsersContainer from "./Components/Users/UsersContainer";

type AppPropsType = {

}

function App(props: AppPropsType) {
    return (
        <div className="AppWrapper">
            <Header/>
            <Routes>
                <Route path='/users' element={<UsersContainer/>}/>
                <Route path='/messages' element={<Messages/>}/>
                <Route path='/posts' element={<PostsContainer/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;


