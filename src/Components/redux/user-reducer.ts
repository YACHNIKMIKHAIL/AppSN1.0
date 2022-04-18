import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {updateObjectInArray} from "../../Utils/Object-helpers/Obj-helpers";
import {usersApi, UserType} from "../../API/UsersApi";


type initialStateType = {
    users: Array<UserType>
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: boolean
    followingId: Array<number>
}

let initialState: initialStateType = {
    users: [] as Array<UserType>,
    pageSize: 90,
    totalCount: 0,
    currentPage: 2,
    isFetching: true,
    followingInProgress: false,
    followingId: []
}

const UsersReducer = (state = initialState, action: ActionsUsersTypes): initialStateType => {
    switch (action.type) {
        case 'UsersReducer/FOLLOW': {
            return {
                ...state,
                // users: state.users.map(m => m.id === action.id ? {...m, followed: true} : m)
                users: updateObjectInArray(action.id, {followed: true}, state.users)
            }
        }
        case 'UsersReducer/UNFOLLOW': {
            return {
                ...state,
                // users: state.users.map(m => m.id === action.id ? {...m, followed: false} : m)
                users: updateObjectInArray(action.id, {followed: false}, state.users)
            }
        }
        case 'UsersReducer/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'UsersReducer/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'UsersReducer/SET_TOTAL_USERS_COUNT': {
            return {...state, totalCount: action.usersCount}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'FOLLOWING_IN_PROGRESS': {
            return {
                ...state, followingInProgress: action.followingInProgress,
                followingId:
                    action.followingInProgress
                        ? [...state.followingId, action.id]
                        : state.followingId.filter(f => f !== action.id)
            }
        }
        default :
            return state
    }
}
type ActionsUsersTypes = InferActionsTypes<typeof usersActions>


export const usersActions = {
    unFollowSuccess: (id: number) => ({type: 'UsersReducer/UNFOLLOW', id} as const),
    setUsers: (users: Array<UserType>) => ({type: 'UsersReducer/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'UsersReducer/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (usersCount: number) => ({
        type: 'UsersReducer/SET_TOTAL_USERS_COUNT',
        usersCount
    } as const),
    followSuccess: (id: number) => {
        return {type: 'UsersReducer/FOLLOW', id} as const
    },
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (followingInProgress: boolean, id: number) => {
        return {
            type: 'FOLLOWING_IN_PROGRESS',
            followingInProgress, id
        } as const
    }
}


type ThunkUserType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsUsersTypes>
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkUserType => async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true))
    let data = await usersApi.getUsersApi(currentPage, pageSize)
    dispatch(usersActions.toggleIsFetching(false))
    dispatch(usersActions.setUsers(data.items))
    dispatch(usersActions.setTotalUsersCount(data.totalCount))
}

export const onPageChangedThunkCreator = (pageNumber: number, pageSize: number): ThunkUserType => async (dispatch) => {
    dispatch(usersActions.setCurrentPage(pageNumber))
    dispatch(usersActions.toggleIsFetching(true))
    let data = await usersApi.getUsersApi(pageNumber, pageSize)
    dispatch(usersActions.toggleIsFetching(false))
    dispatch(usersActions.setUsers(data.items))
}


const followUnfollowFlow = async (dispatch: any, id: any, apiMethod: any, actionCreator: any) => {
    dispatch(usersActions.toggleFollowingInProgress(true, id))
    let data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(usersActions.toggleFollowingInProgress(false, id))
}

export const unFollowThunkCreator = (id: number): ThunkUserType => async (dispatch) => {
    let apiMethod = usersApi.unFollow.bind(usersApi)
    let actionCreator = usersActions.unFollowSuccess
    followUnfollowFlow(dispatch, id, apiMethod, actionCreator)
}

export const followThunkCreator = (id: number): ThunkUserType => async (dispatch) => {
    let apiMethod = usersApi.follow.bind(usersApi)
    let actionCreator = usersActions.followSuccess
    followUnfollowFlow(dispatch, id, apiMethod, actionCreator)
}

export default UsersReducer