import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {store} from "./Components/redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StateType} from "./Components/redux/state";


export type RerenderEntireTreePropsType = {
    State: StateType
}
const rerenderEntireTree = (props: RerenderEntireTreePropsType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={store._state}
                 dispatch={store.dispatch.bind(store)}
                 // updateNewPost={store.updateNewPost.bind(store)}
            />
        </React.StrictMode>,
        document.getElementById('root')
    )
}
rerenderEntireTree({State: store.getState()});
store.subscribe(rerenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
