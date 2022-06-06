import React, {useEffect, useState} from 'react';
import {SearchUserType} from "./GitPage";

const GitTimer: React.FC<{
    seconds: number,
    setSeconds: (s: number) => void,
    selectedU: SearchUserType | null
}> = ({
          seconds,
          setSeconds,
          selectedU
      }) => {
    const [time, setTime] = useState<number>(seconds)

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(actual => actual - 1)
        }, 1000)
        return () => {
            clearInterval(intervalID)
        }
    }, [selectedU])

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