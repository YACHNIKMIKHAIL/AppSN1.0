import React, {useState} from "react";
import style from "./Paginator.module.css"


type PaginatorPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}
export const Paginator = ({totalCount, pageSize, onPageChanged, currentPage, portionSize = 10}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={style.pages}>
        {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>prev</button>}
        {pages.filter(f => f >= leftPortionPageNumber && f <= rightPortionPageNumber)
            .map((p, i) => {
                return <span key={i}
                             onClick={() => {
                                 onPageChanged(p)
                             }}
                             className={currentPage === p ? style.selected : ''}>-{p}-</span>
            })}
        {portionCount > portionNumber && <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>next</button>}
    </div>
}

