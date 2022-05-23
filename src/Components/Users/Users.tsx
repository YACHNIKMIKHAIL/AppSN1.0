import React, {useEffect} from "react";
import s from './Users.module.css'
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./User";
import {UserSearchForm} from "./UsersSearchForm";
import {
    FilterType,
    followThunkCreator,
    getUsersThunkCreator,
    onPageChangedThunkCreator,
    unFollowThunkCreator
} from "../redux/user-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingId,
    getPageSize,
    getTotalCount,
    getUsersSuperSelector
} from "../redux/users-selectors";
import {AppStateType} from "../redux/reduxStore";
import {createBrowserHistory} from "history"
import * as queryString from "querystring";

export const Users = () => {

    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsersSuperSelector)
    const followingId = useSelector(getFollowingId)
    const dispatch = useDispatch()
    const filter = useSelector<AppStateType, FilterType>(state => state.usersPage.filter)
    const history = createBrowserHistory()

    // useEffect(() => {
    //     history.push({
    //         pathname: '/users',
    //         search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    //     })
    // }, [filter, currentPage])

    useEffect(() => {
        //srezaem ?
        const parsed = queryString.parse(history.location.search.substr(1)) as {
            term: string
            friend: 'null' | 'true' | 'false '
            page: string
        }
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === 'null'
                ? null
                : parsed.friend === 'true'
                    ? true
                    : false
        }

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(onPageChangedThunkCreator(pageNumber, pageSize, filter))
    }
    const unFollowFunc = (id: number) => {
        dispatch(unFollowThunkCreator(id))
    }
    const followFunc = (id: number) => {
        dispatch(followThunkCreator(id))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }


    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div className={s.content}>
            <UserSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalCount={totalCount}
            />
            <div className={s.users}>
                {users?.map((m, i) => {
                    return <User
                        user={m}
                        key={i}
                        followThunkCreator={followFunc}
                        unFollowThunkCreator={unFollowFunc}
                        followingId={followingId}/>
                })}
            </div>
        </div>

    )
}