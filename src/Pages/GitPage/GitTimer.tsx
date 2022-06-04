import React, {useEffect, useState} from 'react';

const GitTimer: React.FC = () => {
    const [time, setTime] = useState<number>(10)

    useEffect(() => {
        setInterval(() => {
            setTime(actual => actual - 1)
        }, 1000)
    }, [])

    return (
        <div>
            {time}
        </div>
    );
};

export default GitTimer;