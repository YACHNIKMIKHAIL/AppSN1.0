import React, {useEffect, useState} from 'react';
import {SearchUserType} from "./GitPage";

const GitTimer: React.FC<{ selectedU: SearchUserType | null }> = ({selectedU}) => {
    const [time, setTime] = useState<number>(10)

    useEffect(() => {
        setInterval(() => {
            setTime(actual => actual - 1)
        }, 1000)
    }, [])

    useEffect(() => {
        setTime(10)
    }, [selectedU])

    if (selectedU === null) <></>
    return (
        <div>
            {time}
        </div>
    );
};

export default GitTimer;