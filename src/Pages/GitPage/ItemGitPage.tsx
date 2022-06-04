import React, {useEffect, useState} from 'react';
import {SearchUserType, UserType} from "./GitPage";
import axios from "axios";


const ItemGitPage: React.FC<{ m: SearchUserType, setUDetails: (data: UserType) => void }> = ({m, setUDetails}) => {
    const [selectedU, setSelectedU] = useState<SearchUserType | null>(null)
    useEffect(() => {
        if (selectedU) {
            document.title = selectedU.login
        }
    }, [selectedU])
    useEffect(() => {
        if (!!selectedU) {
            axios.get<UserType>(`https://api.github.com/users/${selectedU.login}`)
                .then((res) => {
                    setUDetails(res.data)
                })
        }
    }, [selectedU])


    return <div onClick={() => {
        setSelectedU(m)
    }}
                style={selectedU === m ? {color: 'red'} : {}}>
        {m.login}
    </div>
};

export default ItemGitPage;