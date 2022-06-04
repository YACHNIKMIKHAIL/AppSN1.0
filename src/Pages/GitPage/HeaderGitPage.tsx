import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SearchResult, SearchUserType} from "./GitPage";


const HeaderGitPage: React.FC<{ value: string, setFixedValue: (v: string) => void }> = ({value, setFixedValue}) => {

    const [tempSearch, setTempSearch] = useState<string>('')
    // const [searchTerm, setSearchTerm] = useState<string>('it-kamasutra')


    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setFixedValue(tempSearch)
        }
    }
    useEffect(() => {
        setTempSearch(value)
    }, [value])

    return (
        <div>
            <input type="text" placeholder={'saerch'}
                   value={tempSearch}
                   onChange={(e) => setTempSearch(e.currentTarget.value)}
                   onKeyPress={(e) => onKeyPressHandler(e)}/>
            <button onClick={() => setFixedValue(tempSearch)}>find</button>
        </div>
    );
};

export default HeaderGitPage;