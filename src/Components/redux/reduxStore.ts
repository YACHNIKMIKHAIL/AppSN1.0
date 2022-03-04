import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import newPostReducer from "./newPost-reducer";
import newMessageReducer from "./newMessage-reducer";
import UsersReducer from "./user-reducer";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer} from "./app-reducer";

let reducer = combineReducers({
    myPosts: newPostReducer,
    myFriends: newMessageReducer,
    usersPage: UsersReducer,
    profile: profileReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof reducer>


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// let store = createStore(reducer, applyMiddleware(thunk));
export type StoreType = typeof store;
//@ts-ignore
window.__store__ = store
export default store
