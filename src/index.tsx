import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store, {AppStateType} from "./Components/redux/reduxStore";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import StoreContext from "./StoreContext";


export type RerenderEntireTreePropsType = {
    State: AppStateType
}
const rerenderEntireTree = (state: AppStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <StoreContext.Provider value={store}>
                <App/>
            </StoreContext.Provider>
        </BrowserRouter>
        ,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());

store.subscribe(()=>{
    let state = store.getState()
    rerenderEntireTree(state)
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
