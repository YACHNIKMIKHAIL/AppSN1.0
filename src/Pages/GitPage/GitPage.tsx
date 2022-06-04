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
    const [searchTerm, setSearchTerm] = useState<string>(initialSearchState)

    return (
        <div style={{display: 'flex'}}>
            <div>
                <HeaderGitPage value={searchTerm} setFixedValue={setSearchTerm}/>
                <button onClick={() => {
                    setSearchTerm(initialSearchState)
                    setSelectedU(null)
                }}>reset
                </button>
                <div>
                    <ItemGitPage onUserSelect={setSelectedU} selectedU={selectedU} term={searchTerm}/>
                </div>
            </div>
            <DescribtionGitPage selectedU={selectedU}/>
        </div>
    );
};

export default GitPage;