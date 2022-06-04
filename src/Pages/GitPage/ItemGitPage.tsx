import React, {useEffect, useState} from 'react';
import {SearchResult, SearchUserType} from "./GitPage";
import axios from "axios";


const ItemGitPage: React.FC<{
    term: string, selectedU: SearchUserType | null, onUserSelect: (u: SearchUserType) => void
}> = ({
          term,
          selectedU,
          onUserSelect
      }) => {

    const [users, setUsers] = useState<SearchUserType[]>([] as SearchUserType[])

    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
            .then((res) => {
                setUsers(res.data.items)
            })
    }, [term])

    useEffect(() => {
        if (selectedU !== null) {
            document.title = selectedU.login
        } else {
            document.title = 'no selected U'
        }
    }, [selectedU])


    return <ul>{
        users.map(m => {
            return <li onClick={() => {
                onUserSelect(m)
            }}
                       style={selectedU === m ? {color: 'red'} : {}}
                       key={m.id}>
                {m.login}
            </li>
        })
    }</ul>


};

export default ItemGitPage;