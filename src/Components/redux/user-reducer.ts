export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: { city: string, country: string }
}


const UsersReducer = (state: Array<UserType>, action: ActionsTypes): Array<UserType> => {
    switch (action.type) {
        case 'FOLLOW': {
            return state.map(m => m.id === action.id ? {...m, followed: true} : m)
        }
        case 'UNFOLLOW': {
            return state.map(m => m.id === action.id ? {...m, followed: false} : m)
        }
        case 'SET_USERS': {
            return {...state, ...action.users}
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

// let initState: Array<UserType> = [
//     {
//         id: 1,
//         photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
//         followed: true,
//         fullName: 'Vitalya',
//         status: 'I am the best',
//         location: {city: 'Brest', country: 'Belarus'}
//     },
//     {
//         id: 2,
//         photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
//         followed: false,
//         fullName: 'Igor',
//         status: 'I am the best of the best',
//         location: {city: 'Brest', country: 'Belarus'}
//     },
//     {
//         id: 3,
//         photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
//         followed: false,
//         fullName: 'Egor',
//         status: 'I am the best of the best of the best',
//         location: {city: 'Brest', country: 'Belarus'}
//     },
//     {
//         id: 4,
//         photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
//         followed: true,
//         fullName: 'Genya',
//         status: 'I am the best of the best of the best of the best',
//         location: {city: 'Brest', country: 'Belarus'}
//     },
//     {
//         id: 5,
//         photoUrl:'https://w7.pngwing.com/pngs/838/427/png-transparent-lilo-stitch-lilo-pelekai-reuben-character-others-experiment-fictional-character-stitch.png',
//         followed: true,
//         fullName: 'Romchik',
//         status: 'I am the best of the best of the best of the best of the best',
//         location: {city: 'Gomel', country: 'Belarus'}
//     },
// ]