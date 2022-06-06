import React, {useEffect, useState} from 'react';
import {SearchUserType, UserType} from "./GitPage";
import axios from "axios";
import GitTimer from "./GitTimer";

const DescribtionGitPage: React.FC<{ selectedU: SearchUserType | null }> = ({selectedU}) => {
    const startTimerSeconds = 5
    const [uDetails, setUDetails] = useState<UserType | null>(null)
    const [seconds, setSeconds] = useState<number>(startTimerSeconds)
    console.log(seconds)

    useEffect(() => {
        if (seconds < 0) setUDetails(null)
    }, [seconds])

    useEffect(() => {
        if (!!selectedU) {
            axios.get<UserType>(`https://api.github.com/users/${selectedU.login}`)
                .then((res) => {
                    setSeconds(startTimerSeconds)
                    setUDetails(res.data)
                })
        }
    }, [selectedU])

    if (selectedU === null) return <></>

    return (
        <div>
            {uDetails && <><GitTimer seconds={seconds} setSeconds={setSeconds} selectedU={selectedU}/>
                {uDetails?.avatar_url && <img src={uDetails.avatar_url} alt={'cdjshg'}
                                              style={{height: '300px', width: '300px'}}/>}

                <div>
                    <h2>{uDetails?.login}</h2>
                    {uDetails?.followers && <h4> folowers: {uDetails.followers}</h4>}
                </div>
            </>}
        </div>
    );
};

export default DescribtionGitPage;