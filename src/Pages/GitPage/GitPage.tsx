import React, {useState} from 'react';
import HeaderGitPage from "./HeaderGitPage";
import ItemGitPage from "./ItemGitPage";
import DescribtionGitPage from "./DescribtionGitPage";

export type SearchUserType = {
    login: string
    id: number
}
export type SearchResult = {
    items: SearchUserType[]
}
export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}
const GitPage = () => {
    const initialSearchState: string = 'it-kamasutra'
    const [selectedU, setSelectedU] = useState<SearchUserType | null>(null)
    const [uDetails, setUDetails] = useState<UserType | null>(null)
    const [u, setU] = useState<SearchUserType[]>([] as SearchUserType[])
    // const [tempSearch, setTempSearch] = useState<string>('it-kamasutra')
    const [searchTerm, setSearchTerm] = useState<string>(initialSearchState)

    // const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         setSearchTerm(tempSearch)
    //     }
    // }
    // useEffect(() => {
    //     if (selectedU) {
    //         document.title = selectedU.login
    //     }
    // }, [selectedU])

    // useEffect(() => {
    //     axios
    //         .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
    //         .then((res) => {
    //             setU(res.data.items)
    //         })
    // }, [searchTerm])

    // useEffect(() => {
    //     if (!!selectedU) {
    //         axios.get<UserType>(`https://api.github.com/users/${selectedU.login}`)
    //             .then((res) => {
    //                 setUDetails(res.data)
    //             })
    //     }
    // }, [selectedU])

    return (
        <div style={{display: 'flex'}}>
            <div>
                <HeaderGitPage value={searchTerm} setFixedValue={setSearchTerm}/>
                <button onClick={() => {
                    setSearchTerm(initialSearchState)
                }}>reset
                </button>
                {/*<div>*/}
                {/*    <input type="text" placeholder={'saerch'}*/}
                {/*           value={tempSearch}*/}
                {/*           onChange={(e) => setTempSearch(e.currentTarget.value)}*/}
                {/*           onKeyPress={(e) => onKeyPressHandler(e)}/>*/}
                {/*    <button onClick={() => setSearchTerm(tempSearch)}>find</button>*/}
                {/*</div>*/}
                <div>
                    <ItemGitPage onUserSelect={setSelectedU} selectedU={selectedU} term={searchTerm}/>
                    {/*{u.map((m) => {*/}
                    {/*        // return <li key={m.id}*/}
                    {/*        //            onClick={() => {*/}
                    {/*        //                setSelectedU(m)*/}
                    {/*        //*/}
                    {/*        //            }}*/}
                    {/*        //            style={selectedU === m ? {color: 'red'} : {}}>*/}
                    {/*        //     {m.login}</li>*/}
                    {/*        return <ItemGitPage key={m.id} m={m} setUDetails={setUDetails}/>*/}
                    {/*    }*/}
                    {/*)}*/}
                </div>
            </div>
            <DescribtionGitPage uDetails={uDetails}/>
            {/*<div>*/}
            {/*    <img src={uDetails?.avatar_url} alt={'cdjshg'}*/}
            {/*         style={{height: '300px', width: '300px'}}/>*/}

            {/*    <div>*/}
            {/*        <h2>{uDetails?.login}</h2>*/}
            {/*        {uDetails?.followers && <h4> folowers: {uDetails.followers}</h4>}*/}
            {/*    </div>*/}


            {/*</div>*/}
        </div>
    );
};

export default GitPage;