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
}

let initialState: initialStateType = {
    users: [] as Array<UserType>,
    pageSize: 90,
    totalCount: 0,
    currentPage: 2,
    isFetching: true
}

const UsersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(m => m.id === action.id ? {...m, followed: true} : m)
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(m => m.id === action.id ? {...m, followed: false} : m)
            }
        }
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalCount: action.usersCount}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        default :
            return state
    }
}
type ActionsTypes =
    followACType
    | unFollowACType
    | setUsersACType
    | setCurrentPageACType
    | setTotalUsersCountACType
    | TOGGLE_IS_FETCHINGACType

type followACType = ReturnType<typeof follow>
export const follow = (id: number) => {
    return {type: 'FOLLOW', id} as const
}

type unFollowACType = ReturnType<typeof unFollow>
export const unFollow = (id: number) => ({type: 'UNFOLLOW', id} as const)

type setUsersACType = ReturnType<typeof setUsers>
export const setUsers = (users: Array<UserType>) => ({type: 'SET_USERS', users} as const)

type setCurrentPageACType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const)

type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export const setTotalUsersCount = (usersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', usersCount} as const)

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
type TOGGLE_IS_FETCHINGACType = ReturnType<typeof toggleIsFetching>
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export default UsersReducer