export type UserType = {
    id: number
    photos: { small: string | null, large: string | null }
    followed: boolean
    name: string
    status: string
    location: { city: string, country: string }
}

let initialState: initialStateType = {
    users: [] as Array<UserType>,
    pageSize: 30,
    totalCount: 100,
    currentPage: 5
}

type initialStateType = {
    users: Array<UserType>
    pageSize: number
    totalCount: number
    currentPage: number
}

const UsersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {...state,
                users: state.users.map(m => m.id === action.id ? {...m, followed: true} : m)
            }
        }
        case 'UNFOLLOW': {
            return {...state,
                users: state.users.map(m => m.id === action.id ? {...m, followed: false} : m)
            }
        }
        case 'SET_USERS': {
            debugger
            return {...state, users: action.users}
        }
        default :
            return state
    }
}
type ActionsTypes = followACType | unFollowACType | setUsersACType

type followACType = ReturnType<typeof followAC>
export const followAC = (id: number) => ({type: 'FOLLOW', id} as const)

type unFollowACType = ReturnType<typeof unFollowAC>
export const unFollowAC = (id: number) => ({type: 'UNFOLLOW', id} as const)

type setUsersACType = ReturnType<typeof setUsersAC>
export const setUsersAC = (users: Array<UserType>) => ({type: 'SET_USERS', users} as const)

export default UsersReducer