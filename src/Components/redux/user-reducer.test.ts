import {initialStateType} from "./user-reducer";

test('', () => {
    const state: initialStateType = {
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
        ],
        pageSize: 90,
        totalCount: 0,
        currentPage: 2,
        isFetching: true,
        followingInProgress: false,
        followingId: []
    }


})