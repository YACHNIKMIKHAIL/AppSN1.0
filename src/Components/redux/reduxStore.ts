import {combineReducers, createStore} from "redux";
import newPostReducer from "./newPost-reducer";
import newMessageReducer from "./newMessage-reducer";
import UsersReducer from "./user-reducer";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";

let reducer = combineReducers({
    myPosts: newPostReducer,
    myFriends: newMessageReducer,
    usersPage: UsersReducer,
    profile: profileReducer,
    auth: authReducer
})

export type AppStateType = ReturnType<typeof reducer>

let store = createStore(reducer);
export type StoreType = typeof store;
//@ts-ignore
window.store=store
export default store
