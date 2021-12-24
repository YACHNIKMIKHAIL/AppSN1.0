import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {Messages} from "./Components/Messages/Messages";
import {AppStateType} from "./Components/redux/reduxStore";
import {PostsContainer} from "./Components/Posts/NewPost/PostsContainer";
import {Dispatch} from "redux";

type AppPropsType = {
    // state: AppStateType
    // dispatch: Dispatch
}

function App(props: AppPropsType) {
    return (
        <div className="AppWrapper">
            <Header/>
            <Routes>
                <Route path='/messages' element={<Messages
                    // myFriends={}
                    //                                        dispatch={props.dispatch}
                />}
                />
                {/*<Route path='/profile' element={<Profile*/}
                {/*    myInfo={props.state.}/>}/>*/}
                {/*<Route path='/posts' element={<Posts*/}
                {/*    newPostText={props.state.myPosts.newPostText}*/}
                {/*    myPosts={props.state.myPosts.myPosts}*/}
                {/*    dispatch={props.dispatch}*/}
                {/*/>*/}
                <Route path='/posts' element={<PostsContainer
                    // state={props.state}
                    // dispatch={props.dispatch}
                />
                }/>
            </Routes>
            {/*<Content/>*/}
            <Footer/>
        </div>
    );
}

export default App;


