import {combineReducers, createStore} from "redux";
import newPostReducer from "./newPost-reducer";
import newMessageReducer from "./newMessage-reducer";

let reducers = combineReducers({
    myPosts: newPostReducer,
    myFriends: newMessageReducer
})

export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers)

export default store