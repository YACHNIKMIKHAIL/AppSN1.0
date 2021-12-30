import {combineReducers, createStore} from "redux";
import newPostReducer from "./newPost-reducer";
import newMessageReducer from "./newMessage-reducer";
import UsersReducer from "./user-reducer";

let reducers = combineReducers({
    myPosts: newPostReducer,
    myFriends: newMessageReducer,
    usersPage:UsersReducer
})

export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers);
export type StoreType = typeof store;

export default store