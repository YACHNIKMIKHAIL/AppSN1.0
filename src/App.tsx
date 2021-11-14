import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Profile} from "./Components/Profile/Profile";
import {Posts} from "./Components/Posts/Posts";
import {StateType} from "./Components/redux/state";
import {Messages} from "./Components/Messages/Messages";
import {DialogsMessages} from "./Components/Messages/DialogWith/DialogsMessages/DialogsMessages";

type AppPropsType = {
    state: StateType
}

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className="AppWrapper">
                <Header/>
                <Routes>
                    <Route path='/messages' element={<Messages myFriends={props.state.myFriends}/>}/>
                    <Route path='/profile' element={<Profile myInfo={props.state.MyInfo}/>}/>
                    <Route path='/posts' element={<Posts myPosts={props.state.myPosts}/>}/>
                    <Route path='/dialogMessages' element={<DialogsMessages
                        messages={props.state.myFriends}/>}/>
                </Routes>
                {/*<Content/>*/}
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;


