import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SearchResult, SearchUserType} from "./GitPage";

const HeaderGitPage: React.FC<{ setU: (items: SearchUserType[]) => void }> = ({setU}) => {
    const [tempSearch, setTempSearch] = useState<string>('it-kamasutra')
    const [searchTerm, setSearchTerm] = useState<string>('it-kamasutra')


    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTerm(tempSearch)
        }
    }
    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then((res) => {
                setU(res.data.items)
            })
    }, [searchTerm])

    return (
        <div>
            <input type="text" placeholder={'saerch'}
                   value={tempSearch}
                   onChange={(e) => setTempSearch(e.currentTarget.value)}
                   onKeyPress={(e) => onKeyPressHandler(e)}/>
            <button onClick={() => setSearchTerm(tempSearch)}>find</button>
        </div>
    );
};

export default HeaderGitPage;