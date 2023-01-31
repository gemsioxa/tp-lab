import React, { useContext, useEffect } from 'react'
import { Context } from '../../index';
import List from '../List/List';
import './Pagination.less'
import { observer } from 'mobx-react-lite';

const Pagination = observer(() => {
    

    const { mainStore } = useContext(Context)
    useEffect(() => {
        const limit = 1 * 3600 * 1000; // 1 час
        const localStorageInitTime = localStorage.getItem('localStorageInitTime');
        if (localStorageInitTime === null) {
            localStorage.setItem('localStorageInitTime', +new Date());
        } else if(+new Date() - localStorageInitTime > limit) {
            localStorage.clear();
            localStorage.setItem('localStorageInitTime', +new Date());
        }
        localStorage.getItem('curPage') ? mainStore.setPage(localStorage.getItem('curPage')) : null
    })

  return (
    <>
        <div className="main-page-pagination">
            <button className="main-page-pagination__arrow-left main-page-pagination__button" onClick={() => mainStore.prevPage()}><i className="fa-solid fa-angle-left" /></button>
            {[...Array(mainStore.totalPages).slice(0,3).keys()].map((elem) => (
                <button
                onClick={() => mainStore.setPage(elem + 1)}
                key={elem}
                className={`${mainStore.page == elem + 1  || mainStore.totalPages == 1 ? "active" : ""} main-page-pagination__page main-page-pagination__button `}
                >
                {elem + 1}
                </button>
            ))}
            <button className="main-page-pagination__arrow-right main-page-pagination__button" onClick={() => mainStore.nextPage()}><i className="fa-solid fa-angle-right" /></button>
        </div>
        <List />
    </>
  )
})

export default Pagination
