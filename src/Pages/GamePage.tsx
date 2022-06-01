import React, {useEffect, useState} from 'react';
import style from './GamePage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../Components/redux/reduxStore";
import userPhoto from "./../assets/images/images.png"
import {PhotosType} from "../API/ProfileApi";
import {getProfileThunkCreator} from "../Components/redux/profile-reducer";
import {useNavigate} from "react-router-dom";
import {RoutesPath} from "../RoutesPath";

const GamePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [opponentName, setOpponentName] = useState<string | null>(null)
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
                                <img src="" alt="jscha"/>
                            </div>
                            <div>User - Gamer Name</div>
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
            {(gamerOneCount < 0 || gamerTwoCount < 0) && <button onClick={resetScoure}> reset </button>}
        </div>
    );
};

export default GamePage;