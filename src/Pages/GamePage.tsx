import React, {useState} from 'react';

const GamePage = () => {
    const [gamerOneCount, setGamerOneCount] = useState<number>(0)
    const [gamerTwoCount, setGamerTwoCount] = useState<number>(0)
    const addToGamerOne = () => {
        setGamerOneCount(gamerOneCount + 1)
    }
    const addToGamerTwo = () => {
        setGamerTwoCount(gamerTwoCount + 1)
    }
    const removeCountFromAllGamers = () => {
        if (gamerOneCount < 0 || gamerTwoCount < 0) return
        setGamerOneCount(gamerOneCount - 1)
        setGamerTwoCount(gamerTwoCount - 1)
    }
    const resetScoure = () => {
        setGamerOneCount(0)
        setGamerTwoCount(0)
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div style={{
                    border: '2px black solid',
                    margin: '10px',
                    width: '200px',
                    height: '300px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <div>User - Gamer Name</div>
                    {gamerTwoCount < 0 && <div>WINNER!</div>}
                    {gamerOneCount >= 0
                        ? <div style={{fontSize: '50px'}}>{gamerOneCount}</div>
                        : <div style={{fontSize: '40px', color: '#242de0'}}>LOOSER!</div>
                    }

                    <div>
                        <button onClick={addToGamerOne}>+</button>
                    </div>
                </div>
                <div style={{
                    border: '2px black solid',
                    margin: '10px',
                    width: '200px',
                    height: '300px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <div>User - Gamer Name</div>
                    {gamerOneCount < 0 && <div>WINNER!</div>}
                    {gamerTwoCount >= 0
                        ? <div style={{fontSize: '50px'}}>{gamerTwoCount}</div>
                        : <div style={{fontSize: '40px', color: '#242de0'}}>LOOSER!</div>
                    }
                    <div>
                        <button onClick={addToGamerTwo}>+</button>
                    </div>
                </div>
            </div>
            <button onClick={removeCountFromAllGamers}>-</button>
            {(gamerOneCount < 0 || gamerTwoCount < 0) && <button onClick={resetScoure}> reset </button>}
        </div>
    );
};

export default GamePage;