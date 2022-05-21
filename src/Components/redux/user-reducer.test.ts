import UsersReducer, {initialStateType, usersActions} from "./user-reducer";

let state: initialStateType

beforeEach(()=>{
     state = {
        users: [
            {
                id: 1, name: 'Vlad', followed: false,
                photos: {small: null, large: null}, status: 'status1',
                location: {city: 'Warsaw', country: 'Poland'}
            },
            {
                id: 2, name: 'Nastya', followed: false,
                photos: {small: null, large: null}, status: 'status2',
                location: {city: 'Warsaw', country: 'Poland'}
            },
            {
                id: 3, name: 'Mama', followed: true,
                photos: {small: null, large: null}, status: 'status3',
                location: {city: 'Brest', country: 'Belarus'}
            },
            {
                id: 4, name: 'Papa', followed: false,
                photos: {small: null, large: null}, status: 'status4',
                location: {city: 'Brest', country: 'Belarus'}
            }
        ],
        pageSize: 90,
        totalCount: 0,
        currentPage: 2,
        isFetching: true,
        followingInProgress: false,
        followingId: [],
         filter: {
             term: '' as string
         }
    }
})

test('user followSuccess test', () => {

    const newState = UsersReducer(state, usersActions.followSuccess(2))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[1].id).toBe(2)
    expect(newState.users[1].name).toBe('Nastya')
})

test('user unFollowSuccess test', () => {


    const newState = UsersReducer(state, usersActions.unFollowSuccess(4))

    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].id).toBe(4)
    expect(newState.users[3].name).toBe('Papa')
})