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
    const search = () => {
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${tempSearch}`)
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
        axios.get<SearchResult>('https://api.github.com/search/users?q=it-kamasutra')
            .then((res) => {
                setU(res.data.items)
            })
    }, [])
    return (
        <div style={{display: 'flex'}}>
            <div>
                <div>
                    <input type="text" placeholder={'saerch'}
                           value={tempSearch}
                           onChange={(e) => setTempSearch(e.currentTarget.value)}/>
                    <button onClick={search}>find</button>
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