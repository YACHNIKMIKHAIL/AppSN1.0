import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Messages} from "./Components/Messages/Messages";
import {Profile} from "./Components/Profile/Profile";
import {Posts} from "./Components/Posts/Posts";
import {StateType} from "./Components/redux/state";

type AppPropsType={
    state:StateType
}
function App(props:AppPropsType) {
    return (
        <BrowserRouter>
            <div className="AppWrapper">
                <Header/>
                <Routes>
                    <Route path='/messages' element={<Messages/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/posts' element={<Posts myPosts={props.state.myPosts}/>}/>
                </Routes>
                {/*<Content/>*/}
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;


