import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, StateType, updateNewPost} from "./Components/redux/state";


type RerenderEntireTreePropsType = {
    State: StateType
}
export const rerenderEntireTree = (props: RerenderEntireTreePropsType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={props.State}
                 addPost={addPost}
                 updateNewPost={updateNewPost}/>
        </React.StrictMode>,
        document.getElementById('root')
    )
}
