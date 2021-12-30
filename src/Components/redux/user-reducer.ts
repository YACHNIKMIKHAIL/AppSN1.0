type UserType = {
    id: number
    followed: boolean
    fullName: string
    status: string
    location: { city: string, country: string }
}

type initStateType = Array<UserType>
let initState: initStateType = [
    {
        id: 1,
        followed: true,
        fullName: 'Vitalya',
        status: 'I am the best',
        location: {city: 'Brest', country: 'Belarus'}
    },
    {
        id: 2,
        followed: false,
        fullName: 'Igor',
        status: 'I am the best of the best',
        location: {city: 'Brest', country: 'Belarus'}
    },
    {
        id: 3,
        followed: false,
        fullName: 'Egor',
        status: 'I am the best of the best of the best',
        location: {city: 'Brest', country: 'Belarus'}
    },
    {
        id: 4,
        followed: true,
        fullName: 'Genya',
        status: 'I am the best of the best of the best of the best',
        location: {city: 'Brest', country: 'Belarus'}
    },
    {
        id: 5,
        followed: true,
        fullName: 'Romchik',
        status: 'I am the best of the best of the best of the best of the best',
        location: {city: 'Gomel', country: 'Belarus'}
    },
]
const UsersReducer = (state = initState, action: ActionsTypes): initStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return state.map(m => m.id === action.id ? {...m, followed: !m.followed} : m)
        }
        case 'UNFOLLOW': {
            return state.map(m => m.id === action.id ? {...m, followed: !m.followed} : m)
        }
        default :
            return state
    }
}
type ActionsTypes = followACType | unFollowACType

type followACType = ReturnType<typeof followAC>
export const followAC = (id: number) => ({type: 'FOLLOW', id})

type unFollowACType = ReturnType<typeof unFollowAC>
export const unFollowAC = (id: number) => ({type: 'UNFOLLOW', id})
export default UsersReducer