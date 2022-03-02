import React from "react";
import s from "./Users.module.css"


type PaginatorPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
export const Paginator = (props: PaginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={s.pages}>{pages.map((p, i) => {
            return <span key={i} onClick={() => {
                props.onPageChanged(p)
            }} className={props.currentPage === p ? s.selected : ''}>-{p}-</span>
        })}
        </div>
    )
}

