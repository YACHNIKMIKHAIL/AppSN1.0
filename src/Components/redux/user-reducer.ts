import {usersApi} from "../../API/Api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

export type UserType = {
    id: number
    photos: { small: string | null, large: string | null }
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string }
}
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
                users: state.users.map(m => m.id === action.id ? {...m, followed: true} : m)
            }
        }
        case 'UsersReducer/UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(m => m.id === action.id ? {...m, followed: false} : m)
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
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
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
type ActionsUsersTypes =
    FollowSuccessACType
    | UnFollowSuccessACType
    | setUsersACType
    | setCurrentPageACType
    | setTotalUsersCountACType
    | ToggleIsFetchingACType
    | FollowingInProgressACType

type FollowSuccessACType = ReturnType<typeof followSuccess>
export const followSuccess = (id: number) => {
    return {type: 'UsersReducer/FOLLOW', id} as const
}

type UnFollowSuccessACType = ReturnType<typeof unFollowSuccess>
export const unFollowSuccess = (id: number) => ({type: 'UsersReducer/UNFOLLOW', id} as const)

type setUsersACType = ReturnType<typeof setUsers>
export const setUsers = (users: Array<UserType>) => ({type: 'UsersReducer/SET_USERS', users} as const)

type setCurrentPageACType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage: number) => ({type: 'UsersReducer/SET_CURRENT_PAGE', currentPage} as const)

type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export const setTotalUsersCount = (usersCount: number) => ({
    type: 'UsersReducer/SET_TOTAL_USERS_COUNT',
    usersCount
} as const)

const TOGGLE_IS_FETCHING = 'UsersReducer/TOGGLE_IS_FETCHING'
type ToggleIsFetchingACType = ReturnType<typeof toggleIsFetching>
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)

const FOLLOWING_IN_PROGRESS = 'UsersReducer/FOLLOWING_IN_PROGRESS'
type FollowingInProgressACType = ReturnType<typeof toggleFollowingInProgress>
export const toggleFollowingInProgress = (followingInProgress: boolean, id: number) => {
    return {
        type: FOLLOWING_IN_PROGRESS,
        followingInProgress, id
    } as const
}

type ThunkUserType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsUsersTypes>
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkUserType => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true))
    let data = await usersApi.getUsersApi(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const onPageChangedThunkCreator = (pageNumber: number, pageSize: number): ThunkUserType => async (dispatch) => {
    dispatch(setCurrentPage(pageNumber))
    dispatch(toggleIsFetching(true))
    let data = await usersApi.getUsersApi(pageNumber, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
}

export const unFollowThunkCreator = (id: number): ThunkUserType => async (dispatch) => {
    dispatch(toggleFollowingInProgress(true, id))
    let data = await usersApi.unFollow(id)
    if (data.resultCode === 0) {
        dispatch(unFollowSuccess(id))
    }
    dispatch(toggleFollowingInProgress(false, id))
}

export const followThunkCreator = (id: number): ThunkUserType => async (dispatch) => {
    dispatch(toggleFollowingInProgress(true, id))
    let data = await usersApi.follow(id)
    if (data.resultCode === 0) {
        dispatch(followSuccess(id))
    }
    dispatch(toggleFollowingInProgress(false, id))
}

export default UsersReducer