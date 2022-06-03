import React, {useEffect, useState} from 'react';
import axios from "axios";

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}
type UserType = {
    login: string
    id: number
    avatar_url: string
    folowers: number
}
const GitPage = () => {
    const [selectedU, setSelectedU] = useState<SearchUserType | null>(null)
    const [uDetails, setUDetails] = useState<UserType | null>(null)
    const [u, setU] = useState<SearchUserType[]>([] as SearchUserType[])
    const [tempSearch, setTempSearch] = useState<string>('it-kamasutra')
    const [searchTerm, setSearchTerm] = useState<string>('it-kamasutra')

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTerm(tempSearch)
        }
    }
    useEffect(() => {
        if (selectedU) {
            document.title = selectedU.login
        }
    }, [selectedU])

    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then((res) => {
                setU(res.data.items)
            })
    }, [searchTerm])

    useEffect(() => {
        if (!!selectedU) {
            axios.get<UserType>(`https://api.github.com/users/${selectedU.login}`)
                .then((res) => {
                    setUDetails(res.data)
                })
        }
    }, [selectedU])
    return (
        <div style={{display: 'flex'}}>
            <div>
                <div>
                    <input type="text" placeholder={'saerch'}
                           value={tempSearch}
                           onChange={(e) => setTempSearch(e.currentTarget.value)}
                           onKeyPress={(e) => onKeyPressHandler(e)}/>
                    <button onClick={() => setSearchTerm(tempSearch)}>find</button>
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
                <h2>login: {uDetails?.login}</h2>
                <img src={uDetails?.avatar_url} alt={'cdjshg'}/>
            </div>
        </div>
    );
};

export default GitPage;