import React, {useEffect, useState} from 'react';
import axios from "axios";

type SearchUserType = {
    login: string
}
type SearchResult = {
    items: SearchUserType[]
}
const GitPage = () => {
    const [selectedU, setSelectedU] = useState<string | null>(null)

    useEffect(() => {
        if (selectedU) {
            document.title = selectedU
        }
    }, [selectedU])

    useEffect(() => {
        axios.get<SearchResult>('https://api.github.com/search/users?q=it-kamasutra')
            .then((res)=>{
                console.log(res)
            })
    }, [])
    return (
        <div style={{display: 'flex'}}>
            <div>
                <div>
                    <input type="text" placeholder={'saerch'}/>
                    <button>find</button>
                </div>
                <ul>
                    {['user I', 'user II', 'user III', 'user IV', 'user V', 'user VI', 'user VI I'].map((m, i) => {
                            return <li key={i}
                                       onClick={() => {
                                           setSelectedU(m)

                                       }}
                                       style={selectedU === m ? {color: 'red'} : {}}>
                                {m}</li>
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