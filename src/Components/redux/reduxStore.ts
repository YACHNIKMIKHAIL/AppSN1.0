import {combineReducers, createStore} from "redux";
import newPostReducer from "./newPost-reducer";
import newMessageReducer from "./newMessage-reducer";
import UsersReducer from "./user-reducer";
import profileReducer from "./profile-reducer";

let reducer = combineReducers({
    myPosts: newPostReducer,
    myFriends: newMessageReducer,
    usersPage: UsersReducer,
    profile: profileReducer
})

export type AppStateType = ReturnType<typeof reducer>

let store = createStore(reducer);
export type StoreType = typeof store;

export default store
