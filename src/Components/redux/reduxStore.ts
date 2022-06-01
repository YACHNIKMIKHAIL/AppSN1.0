import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import newPostReducer from "./newPost-reducer";
import newMessageReducer from "./newMessage-reducer";
import UsersReducer from "./user-reducer";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer} from "./app-reducer";
import chatReducer from "./chat-reducer";
import {gameReducer} from "./game-reducer";

let reducer = combineReducers({
    myPosts: newPostReducer,
    myFriends: newMessageReducer,
    usersPage: UsersReducer,
    profile: profileReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
    game: gameReducer,
})

export type AppStateType = ReturnType<typeof reducer>

// export type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// let store = createStore(reducer, applyMiddleware(thunk));
export type StoreType = typeof store;
//@ts-ignore
window.store = store
// window.__store__ = store
export default store
