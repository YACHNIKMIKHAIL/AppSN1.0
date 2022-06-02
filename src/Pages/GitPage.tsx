import React, {useEffect, useState} from 'react';
import axios from "axios";

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}
const GitPage = () => {
    const [selectedU, setSelectedU] = useState<SearchUserType | null>(null)
    const [u, setU] = useState<SearchUserType[]>([] as SearchUserType[])
    const [tempSearch, setTempSearch] = useState<string>('')
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchData(tempSearch)
        }
    }
    const fetchData = (term: string) => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
            .then((res) => {
                setU(res.data.items)
            })
    }
    useEffect(() => {
        if (selectedU) {
            document.title = selectedU.login
        }
    }, [selectedU])

    useEffect(() => {
        fetchData('it-kamasutra')
    }, [])
    return (
        <div style={{display: 'flex'}}>
            <div>
                <div>
                    <input type="text" placeholder={'saerch'}
                           value={tempSearch}
                           onChange={(e) => setTempSearch(e.currentTarget.value)}
                           onKeyPress={(e) => onKeyPressHandler(e)}/>
                    <button onClick={() => fetchData(tempSearch)}>find</button>
                </div>
                <ul>
                    {u.map((m) => {
                            return <li key={m.id}
                                       onClick={() => {
                                           setSelectedU(m)

                                       }}
                                       style={selectedU === m ? {color: 'red'} : {}}>
                                {m.login}</li>
                        }
                    )}
                </ul>
            </div>
            <div>
                <h2>User name</h2>
                <div>details</div>
            </div>
        </div>
    );
};

export default GitPage;