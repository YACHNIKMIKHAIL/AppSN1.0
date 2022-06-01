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

const GamePage = () => {
    const opponent = useSelector<AppStateType, initialOpponentType>(state => state.game)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [opponentName, setOpponentName] = useState<string | null>(opponent.name)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const myId = useSelector<AppStateType, number | null>(state => state.auth.id)
    const myName = useSelector<AppStateType, string>(state => state.profile.profile.fullName)
    const myPhotos = useSelector<AppStateType, PhotosType>(state => state.profile.profile.photos)
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
    const resetOpponent = () => {
        dispatch(gameActions.addOpponent(null, null))
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

                {opponentName !== null
                    ? <div className={style.gamerCase}>
                        <div>
                            <div>
                                <img src={opponent.photo?.large || opponent.photo?.small || userPhoto} alt="jscha"/>
                            </div>
                            <div>{opponentName}</div>
                        </div>

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
                    : <div className={style.gamerCase}>
                        <button onClick={() => navigate(RoutesPath.developers)}>chose opponent</button>
                    </div>
                }


            </div>
            <button onClick={removeCountFromAllGamers}>-</button>
            {(gamerOneCount < 0 || gamerTwoCount < 0) && <button onClick={resetScoure}> reset game</button>}
        </div>
    );
};

export default GamePage;