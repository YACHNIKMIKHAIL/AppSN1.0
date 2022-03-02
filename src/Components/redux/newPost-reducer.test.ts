import newPostReducer, {addPostAC, deletePostAC, InitialType} from "./newPost-reducer";

let initState: InitialType = {
    myPosts: [
        {
            date: new Date().getTime(),
            id: 1,
            text: " But where to start",
            likecount: 76
        },
        {
            date: new Date().getTime(),
            id: 2,
            text: "actory is an American  se posts get a lot of ",
            likecount: 46
        },
        {
            date: new Date().getTime(),
            id: 3,
            text: "und the world. But whathat’s on the me",
            likecount: 32
        }

    ]
}

test('new post shold be added', () => {

    let endState = newPostReducer(initState, addPostAC('blabla'))

    expect(initState.myPosts[0].id).toBe(endState.myPosts[0].id)
    expect(endState.myPosts.length).toBe(4)
    expect(endState.myPosts[3].text).toBe('blabla')
    expect(endState.myPosts[3].likecount).toBe(0)
    expect(endState.myPosts[2].likecount).toBe(32)
})

test('delete post', () => {

    let endState = newPostReducer(initState, deletePostAC(1))


    expect(endState.myPosts.length).toBe(2)
    expect(endState.myPosts[0].text).toBe('actory is an American  se posts get a lot of ')
    expect(endState.myPosts[0].likecount).toBe(46)
    expect(endState.myPosts[1].likecount).toBe(32)
})