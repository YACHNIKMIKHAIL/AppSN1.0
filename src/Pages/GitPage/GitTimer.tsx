import React, {useEffect, useState} from 'react';
import {UserType} from "./GitPage";

const GitTimer: React.FC<{ seconds: number, setSeconds: (s: number) => void, uDetails: UserType | null }> = ({
                                                                                                                 seconds,
                                                                                                                 setSeconds,
                                                                                                                 uDetails
                                                                                                             }) => {
    const [time, setTime] = useState<number>(10)

    useEffect(() => {
        setInterval(() => {
            setTime(actual => actual - 1)
        }, 1000)
    }, [])

    useEffect(() => {
        setSeconds(time)
    }, [time])

    useEffect(() => {
        setTime(seconds)
    }, [seconds])

    return (
        <div>
            {time}
        </div>
    );
};

export default GitTimer;