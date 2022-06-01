import React, {useState} from 'react';
import style from './GamePage.module.css';

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
        <div className={style.main}>
            <div className={style.case}>
                <div className={style.gamerCase}>
                    <div>User - Gamer Name</div>
                    {gamerOneCount >= 0
                        ? <>{gamerTwoCount < 0
                            ? <div className={style.winner}>WINNER!</div>
                            : <div className={style.count}>{gamerOneCount}</div>}</>
                        : <div className={style.looser}>LOOSER!</div>
                    }

                    <div>
                        <button onClick={addToGamerOne}>+</button>
                    </div>
                </div>
                <div className={style.gamerCase}>
                    <div>User - Gamer Name</div>

                    {gamerTwoCount >= 0
                        ? <>{gamerOneCount < 0
                            ? <div className={style.winner}>WINNER!</div>
                            : <div className={style.count}>{gamerTwoCount}</div>
                        }</>
                        : <div className={style.looser}>LOOSER!</div>
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