import React, {useEffect, useState} from 'react';

const GitTimer: React.FC<{ seconds: number, setSeconds: (s: number) => void }> = ({
                                                                                      seconds,
                                                                                      setSeconds
                                                                                  }) => {
    const [time, setTime] = useState<number>(seconds)
    
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(actual => actual - 1)
        }, 1000)
        return () => {
            clearInterval(intervalID)
        }
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