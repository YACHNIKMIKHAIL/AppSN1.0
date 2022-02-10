import {AppStateType} from "./reduxStore";
import {UserType} from "./user-reducer";
import { createSelector } from 'reselect'

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsersSuperSelector = createSelector (getUsers, (users:UserType[]) => {
    return users.filter(u => true)
})
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalCount = (state: AppStateType) => {
    return state.usersPage.totalCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getFollowingId = (state: AppStateType) => {
    return state.usersPage.followingId
}

