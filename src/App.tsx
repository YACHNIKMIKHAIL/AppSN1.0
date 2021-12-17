import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./Components/Profile/Profile";
import {Posts} from "./Components/Posts/Posts";
import {StateType} from "./Components/redux/stote";
import {Messages} from "./Components/Messages/Messages";

type AppPropsType = {
    state: StateType
    dispatch: (action: any) => void
}

function App(props: AppPropsType) {
    return (
        <div className="AppWrapper">
            <Header/>
            <Routes>
                <Route path='/messages' element={<Messages myFriends={props.state.myFriends}
                                                           dispatch={props.dispatch}/>}/>
                <Route path='/profile' element={<Profile
                    myInfo={props.state.MyInfo}/>}/>
                <Route path='/posts' element={<Posts
                    newPostText={props.state.newPostText}
                    myPosts={props.state.myPosts}
                    dispatch={props.dispatch}/>}
                />
            </Routes>
            {/*<Content/>*/}
            <Footer/>
        </div>
    );
}

export default App;


