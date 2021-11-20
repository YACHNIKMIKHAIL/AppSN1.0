import img1 from './../Images/avas/images (1).jpeg'
import img2 from './../Images/avas/images.jpeg'
import img3 from './../Images/avas/images (2).jpeg'
import img4 from './../Images/avas/images (3).jpeg'

export type MyPostsType = {
    id: number
    text: string
    likecount: number
}
export type NameType = {
    title: string
    first: string
    last: string
}
export type LocationType = {
    street: string
    city: string
    state: string
}
export type DobType = {
    date: string
    age: number
}
export type MyInfoType = {
    avatar: string
    gender: string
    name: NameType
    location: LocationType
    email: string
    dob: DobType
    phone: string
}
export type MyFriendsType = {
    img: string
    id: number
    name: string
    messages: MessagesType
}
export  type MyMessType = {
    id: number
    title: string
}
export  type friendMessType = {
    id: number
    title: string
}
export type MessagesType = {
    myMess: Array<MyMessType>
    friendMess: Array<friendMessType>
}
export type StateType = {
    myPosts: Array<MyPostsType>
    MyInfo: MyInfoType
    myFriends: Array<MyFriendsType>
    // addPost:(postMessage:string)=>void
}

export const State: StateType = {
    myPosts: [
        {
            id: 1,
            text: "bably heard it a dozen times before, but social media needs to be part of your online strategy. " +
                "Whether you have a website, personal blog or webshop, social media allows you to reach and connect " +
                "with your audience. To get new people into contact with you and to stay top of mind with your current " +
                "customer base or followers. But where to start",
            likecount: 76
        },
        {
            id: 2,
            text: "actory is an American chain of restaurants, localized around the world. If you’re not familiar" +
                " with it, you may recognize the name from the hit series The Big Bang Theory. They have a large " +
                "following on Facebook and regularly post about food that’s on their menu. These posts get a lot of ",
            likecount: 46
        },
        {
            id: 3,
            text: "und the world. But what this example shows us is that a restaurant can do very well on social" +
                " media by using nothing more than humor and quality pictures. Which keeps the audience entertained " +
                "and attracts them to the restaurant by showing what’s on the me",
            likecount: 32
        }

    ],
    MyInfo: {
        avatar: img1,
        gender: "male",
        name: {
            title: "mr",
            first: "brad",
            last: "gibson"
        },
        location: {
            street: "9278 new road",
            city: "kilcoole",
            state: "waterford"
        },
        email: "brad.gibson@example.com",
        dob: {
            date: "1993-07-20T09:44:18.674Z",
            age: 26
        },
        phone: "011-962-7516",
    },
    myFriends: [
        {
            img: img2,
            id: 1, name: 'Kolia',
            messages: {
                myMess: [
                    {id: 1, title: '1 not working due to missing reference to NvModuleTracker'},
                    {id: 3, title: '3 not working due to missing reference to NvModuleTracker'},
                    {id: 6, title: '6 Shadorking due to missing reference to NvModuleTracker'},
                    {id: 7, title: '7 missing reference to NvModuleTracker'},
                    {id: 9, title: '9 not working due to missing reference to NvModuleTracker'},
                ],
                friendMess: [
                    {id: 2, title: '2 not working due to missing reference to NvModuleTracker'},
                    {id: 4, title: ' 4 working due to missing reference to NvModuleTracker'},
                    {id: 5, title: '5 working due to missing reference to NvModuleTracker'},
                    {id: 8, title: '8 not working due to missing reference to NvModuleTracker'},
                    {id: 10, title: '10 not working due to missing reference to NvModuleTracker'}
                ]
            }
        },
        {
            img: img1,
            id: 2, name: 'Igor',
            messages: {
                myMess: [
                    {id: 1, title: '1 not working due to missing reference to NvModuleTracker'},
                    {id: 3, title: '3 not working due to missing reference to NvModuleTracker'},
                    {id: 6, title: '6 Shadorking due to missing reference to NvModuleTracker'},
                    {id: 7, title: '7 missing reference to NvModuleTracker'},
                    {id: 9, title: '9 not working due to missing reference to NvModuleTracker'},
                ],
                friendMess: [
                    {id: 2, title: '2 not working due to missing reference to NvModuleTracker'},
                    {id: 4, title: '4 not working due to missing reference to NvModuleTracker'},
                    {id: 5, title: '5 working due to missing reference to NvModuleTracker'},
                    {id: 8, title: '8 not working due to missing reference to NvModuleTracker'},
                    {id: 10, title: '10 not working due to missing reference to NvModuleTracker'}
                ]
            }
        },
        {
            img: img3,
            id: 3, name: 'Vitalia',
            messages: {
                myMess: [
                    {id: 1, title: '1 not working due to missing reference to NvModuleTracker'},
                    {id: 3, title: '3 not working due to missing reference to NvModuleTracker'},
                    {id: 6, title: '6 Shadorking due to missing reference to NvModuleTracker'},
                    {id: 7, title: '7 missing reference to NvModuleTracker'},
                    {id: 9, title: '9 not working due to missing reference to NvModuleTracker'},
                ],
                friendMess: [
                    {id: 2, title: '1 not working due to missing reference to NvModuleTracker'},
                    {id: 4, title: '4 not working due to missing reference to NvModuleTracker'},
                    {id: 5, title: '5 working due to missing reference to NvModuleTracker'},
                    {id: 8, title: '8 not working due to missing reference to NvModuleTracker'},
                    {id: 10, title: '10 to missing reference to NvModuleTracker'}
                ]
            }
        },
        {
            img: img4,
            id: 4, name: 'Egor',
            messages: {
                myMess: [
                    {id: 1, title: '1 nossing reference to NvModuleTracker'},
                    {id: 3, title: '3 not wissing reference to NvModuleTracker'},
                    {id: 6, title: '6 due to missing reference to NvModuleTracker'},
                    {id: 7, title: '7 e to NvModuleTracker'},
                    {id: 9, title: '9 due to missing reference to NvModuleTracker'},
                ],
                friendMess: [
                    {id: 2, title: '2 due to missing reference to NvModuleTracker'},
                    {id: 4, title: '4 ue to missing reference to NvModuleTracker'},
                    {id: 5, title: '5 reference to NvModuleTracker'},
                    {id: 8, title: '8 to missing reference to NvModuleTracker'},
                    {id: 10, title: '10 missing reference to NvModuleTracker'}
                ]
            }
        },
    ],

}
export let addPost = (postMessage: string) => {
    let newPost: MyPostsType = {
        id: 5,
        text: postMessage,
        likecount: 0
    };
    State.myPosts.push(newPost)
}