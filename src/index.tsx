import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import {SamuraiJSApp} from './App';


// export type RerenderEntireTreePropsType = {
//     State: AppStateType
// }

let h1 = document.createElement("h1")
h1.innerHTML = "NO WAR!"
// @ts-ignore
// document.querySelector("body").appendChild(h1)
// const rerenderEntireTree = (state: AppStateType) => {
ReactDOM.render(
    <SamuraiJSApp/>, document.getElementById('root')
);


// }
// rerenderEntireTree(store.getState());

// store.subscribe(()=>{
//     let state = store.getState()
//     rerenderEntireTree(state)
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
