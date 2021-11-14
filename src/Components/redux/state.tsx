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
    messages: AllMessagesType
}
export  type AllMessagesType = {
    myMess: Array<string>
    friendMess: Array<string>
}
export type StateType = {
    myPosts: Array<MyPostsType>
    MyInfo: MyInfoType
    myFriends: Array<MyFriendsType>
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
        },
        {
            id: 4,
            text: "und the world. But what this example shows us is that a restaurant can do very well on social " +
                "media by using nothing more than humor and quality pictures. Which keeps the audience entertained and" +
                " attracts them to the restaurant by showing what’s on the me",
            likecount: 46
        },
        {
            id: 5,
            text: "und the world. But what this example shows us is that a restaurant can do very well on social" +
                " media by using nothing more than humor and quality pictures. Which keeps the audience entertained and" +
                " attracts them to the restaurant by showing what’s on the me",
            likecount: 76
        },
        {
            id: 6,
            text: "und the world. But what this example shows us is that a restaurant can do very well on social " +
                "media by using nothing more than humor and quality pictures. Which keeps the audience entertained and " +
                "attracts them to the restaurant by showing what’s on the me",
            likecount: 92
        },
        {
            id: 7,
            text: "ite popular and their mission is to make chocolate 100% slave-free. As they are opinionated, " +
                "which fits their mission, they often g",
            likecount: 46
        },
        {
            id: 8,
            text: "ite popular and their mission is to make chocolate 100% slave-free. As they are opinionated," +
                " which fits their mission, they often g",
            likecount: 46
        },
        {
            id: 9, text: ", who also makes these earrings herself. And to celebrate that her account now has 1000 " +
                "followers she decided to do another giveaway. Mind you, this may be a smaller business, but her " +
                "Instagram account is only four months old and she already had 500 followers after the first month.",
            likecount: 46
        },
        {
            id: 10, text: ", who also makes these earrings herself. And to celebrate that her account now has 1000 " +
                "followers she decided to do another giveaway. Mind you, this may be a smaller business, but her " +
                "Instagram account is only four months old and she already had 500 followers after the first month.",
            likecount: 46
        },
        {
            id: 11,
            text: "g away some of your expertise for free in posts like this one, people will be more inclined to " +
                "follow you online and remember your brand. It may feel a bit contradictory, but by helping people do " +
                "some stuff by themselves they will come to you when they need more ",
            likecount: 46
        },
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
                    'ot only keeps things tidy, but also lowers disk u',
                    ' avoid race conditions',
                    'Fixed NVCleanstall window redraw hung for a few seconds after driver installation',
                    'To fix a compatibility issue with winget, NVCleanstall will now wait for the installer to complete b',
                    'efore terminating'
                ],
                friendMess: [
                    'Fixed ShadowPlay not working due to missing reference to NvModuleTracker',
                    'Added optional driver signing mode thats compatible with EasyAntiCheat',
                    'Once driver signature rebuild is complete, throw away the generated private key for additional security',
                    'Added button to create self-contained .exe installer with the slimmed driver package',
                    'Added option to disable NVContainer, which reduces the number of processes even further',
                    'but breaks GFE and the NVIDIA Control Panel',
                    'Added options to set Message-Signaled-Interrupt CPU selection and priority',
                    'Ensure MSI only gets activated on devices with "nvlddmkm" driver'
                ]
            }
        },
        {
            img: img3,
            id: 2, name: 'Vitalia',
            messages: {
                myMess: [
                    'ot only keeps things tidy, but also lowers disk u',
                    ' avoid race conditions'
                ],
                friendMess: [
                    'Added option to disable NVContainer, which reduces the number of processes even further',
                    'but breaks GFE and the NVIDIA Control Panel',
                    'Added options to set Message-Signaled-Interrupt CPU selection and priority',
                    'Ensure MSI only gets activated on devices with "nvlddmkm" driver'
                ]
            }
        },
        {
            img: img4,
            id: 3, name: 'Igor',
            messages: {
                myMess: [
                    'ot only keeps things tidy, but also lowers disk u'
                ],
                friendMess: [
                    'Added option to disable NVContainer, which reduces the number of processes even further'
                ]
            }
        }
    ]
}
