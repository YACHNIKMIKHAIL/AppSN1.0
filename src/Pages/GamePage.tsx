import React, {useEffect, useState} from 'react';
import style from './GamePage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../Components/redux/reduxStore";
import userPhoto from "./../assets/images/images.png"
import {PhotosType} from "../API/ProfileApi";
import {getProfileThunkCreator} from "../Components/redux/profile-reducer";
import {useNavigate} from "react-router-dom";
import {RoutesPath} from "../RoutesPath";
import {gameActions, initialOpponentType} from "../Components/redux/game-reducer";
import {PairArrayType} from "../App";

const GamePage = ({pairArray}: { pairArray: PairArrayType }) => {
    const findMaxPair = (pairArray: PairArrayType) => {
        let maxPair: [number, number] | null = null
        for (let i = 0; i < pairArray.length; i++) {
            if (maxPair === null) {
                maxPair = pairArray[i]
            } else if (Math.max(pairArray[i][0], pairArray[i][1]) > Math.max(maxPair[0], maxPair[1])) {
                maxPair = pairArray[i]
            }
        }
        return maxPair
    }

    const opponent = useSelector<AppStateType, initialOpponentType>(state => state.game)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [opponentName, setOpponentName] = useState<string | null>(opponent.name)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const myId = useSelector<AppStateType, number | null>(state => state.auth.id)
    const myName = useSelector<AppStateType, string>(state => state.profile.profile.fullName)
    const myPhotos = useSelector<AppStateType, PhotosType>(state => state.profile.profile.photos)

    let nPair = findMaxPair(pairArray)
    if (nPair === null) {
        nPair = [0, 0]
    }

    const [gamerOneCount, setGamerOneCount] = useState<number>(nPair[0])
    const [gamerTwoCount, setGamerTwoCount] = useState<number>(nPair[1])
    const addToGamerOne = () => {
        setGamerOneCount((actual) => actual + 1)
    }
    const addToGamerTwo = () => {
        setGamerTwoCount((actual) => actual + 1)
    }
    const removeCountFromAllGamers = () => {
        if (gamerOneCount < 0 || gamerTwoCount < 0) return
        setGamerOneCount((actual) => actual - 1)
        setGamerTwoCount((actual) => actual - 1)
    }
    const resetScoure = () => {
        setGamerOneCount(0)
        setGamerTwoCount(0)
    }
    const resetOpponent = () => {
        dispatch(gameActions.addOpponent(null, null))
        setOpponentName(null)
    }
    const addMeNow = async () => {
        if (myId)
            await dispatch(getProfileThunkCreator(myId))
        setIsLoading(false)
    }
    useEffect(() => {
        addMeNow()
    }, [])
    if (isLoading) {
        return <div> W A I T </div>
    }
    return (
        <div className={style.main}>
            {opponentName !== null && <button onClick={resetOpponent}>reset OPPONENT</button>}
            <div className={style.case}>
                <div className={style.gamerCase}>
                    <div>
                        <div>
                            <img src={myPhotos.small || myPhotos.large || userPhoto} alt="jscha"/>
                        </div>
                        <div>{myName}</div>
                    </div>
                    {
                        gamerOneCount === gamerTwoCount && gamerOneCount < 0
                            ? <div>Over for ALL</div>
                            : gamerTwoCount < 0 && gamerOneCount >= 0
                                ? <div className={style.winner}>WINNER!</div>
                                : gamerOneCount >= 0
                                    ? <div className={style.count}>{gamerOneCount}</div>
                                    : <div className={style.looser}>LOOSER!</div>
                    }

                    <div>
                        <button onClick={addToGamerOne}>+</button>
                    </div>
                </div>

                {opponentName !== null
                    ? <div className={style.gamerCase}>
                        <div>
                            <div>
                                <img src={opponent.photo?.large || opponent.photo?.small || userPhoto} alt="jscha"/>
                            </div>
                            <div>{opponentName}</div>
                        </div>
                        {
                            gamerTwoCount === gamerOneCount && gamerTwoCount < 0
                                ? <div>Over for ALL</div>
                                : gamerOneCount < 0 && gamerTwoCount >= 0
                                    ? <div className={style.winner}>WINNER!</div>
                                    : gamerTwoCount >= 0
                                        ? <div className={style.count}>{gamerTwoCount}</div>
                                        : <div className={style.looser}>LOOSER!</div>
                        }
                        <div>
                            <button onClick={addToGamerTwo}>+</button>
                        </div>
                    </div>
                    : <div className={style.gamerCase}>
                        <button onClick={() => navigate(RoutesPath.developers)}>chose opponent</button>
                    </div>
                }


            </div>
            {opponentName !== null && <button onClick={removeCountFromAllGamers}>-</button>}
            {(gamerOneCount < 0 || gamerTwoCount < 0) && <button onClick={resetScoure}> reset game</button>}
        </div>
    );
};

export default GamePage;