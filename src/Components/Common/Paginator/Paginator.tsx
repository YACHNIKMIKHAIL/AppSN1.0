import React from "react";
import style from "./Paginator.module.css"


type PaginatorPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
export const Paginator = ({totalCount, pageSize, onPageChanged, currentPage}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={style.pages}>{pages.map((p, i) => {
            return <span key={i} onClick={() => {
                onPageChanged(p)
            }} className={currentPage === p ? style.selected : ''}>-{p}-</span>
        })}
        </div>
    )
}

