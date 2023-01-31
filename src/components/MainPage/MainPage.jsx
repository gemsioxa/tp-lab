import React, {useState, useEffect, useContext} from 'react'
import { Context } from '../../index'
import './MainPage.less'
import SearchSVG from '../../img/MainPage/Search.png'
import Pagination from '../Pagination/Pagination'
import { observer } from 'mobx-react-lite'
import ShowAmount from '../ShowAmount/ShowAmount'

import {useTranslation} from "react-i18next";
const MainPage = observer(() => {
    
    // const { t, i18n } = useTranslation();

    // const changeLanguage = (language) => {
    //     i18n.changeLanguage(language);
    // };

    const { mainStore } = useContext(Context)
    const [nameSort, setNameSort] = useState(0)
    const [viewSort, setViewSort] = useState(0)
    const [startSort, setStartSort] = useState(0)
    const [endSort, setEndSort] = useState(0)

    function zeroSort (currentSort) {
        switch (currentSort) {
            case 'name':
                setViewSort(0)
                setStartSort(0)
                setEndSort(0)
                break
            case 'view':
                setNameSort(0)
                setStartSort(0)
                setEndSort(0)
                break
            case 'start':
                setNameSort(0)
                setViewSort(0)
                setEndSort(0)
                break
            case 'end':
                setNameSort(0)
                setViewSort(0)
                setStartSort(0)
                break
            case 'reset':
                setNameSort(0)
                setViewSort(0)
                setStartSort(0)
                setEndSort(0)
                break
            default:
                break
        } 
    }

    function sortByName() {
        if (nameSort == 1) {
            mainStore.products.sort((a, b) => a.name > b.name ? -1 : 1)
            setNameSort(prev => prev = 2)
            localStorage.setItem('sortType', 'name2')
        } else {
            mainStore.products.sort((a, b) => a.name > b.name ? 1 : -1)
            setNameSort(prev => prev = 1)
            localStorage.setItem('sortType', 'name1')
            zeroSort('name')
        }
    }

    function sortByViews() {
        if (viewSort == 1) {
            mainStore.products.sort((a, b) => a.views > b.views ? 1 : -1)
            setViewSort(prev => prev = 2)
            localStorage.setItem('sortType', 'view2')
            
        } else {
            mainStore.products.sort((a, b) => a.views > b.views ? -1 : 1)
            setViewSort(prev => prev = 1)
            localStorage.setItem('sortType', 'view1')
            zeroSort('view')
        }
    }

    function sortByStartDate() {
        if (startSort == 1) {
            mainStore.products.sort((a, b) => {
                const aSort = new Date(`${a.start_date.split(/\//)[2]}-${a.start_date.split(/\//)[0]}-${a.start_date.split(/\//)[1]}`)
                const bSort = new Date(`${b.start_date.split(/\//)[2]}-${b.start_date.split(/\//)[0]}-${b.start_date.split(/\//)[1]}`)
                if (aSort > bSort) return 1 
                else return -1
            })
            setStartSort(prev => prev = 2)
            localStorage.setItem('sortType', 'start2')
            
        } else {
            mainStore.products.sort((a, b) => {
                const aSort = new Date(`${a.start_date.split(/\//)[2]}-${a.start_date.split(/\//)[0]}-${a.start_date.split(/\//)[1]}`)
                const bSort = new Date(`${b.start_date.split(/\//)[2]}-${b.start_date.split(/\//)[0]}-${b.start_date.split(/\//)[1]}`)
                
                if (aSort < bSort) return 1 
                else return -1
            })
            setStartSort(prev => prev = 1)
            localStorage.setItem('sortType', 'start1')
            zeroSort('start')
        }
    }

    function sortByEndDate() {
        if (endSort == 1) {
            mainStore.products.sort((a, b) => {
                const aSort = new Date(`${a.end_date.split(/\//)[2]}-${a.end_date.split(/\//)[0]}-${a.end_date.split(/\//)[1]}`)
                const bSort = new Date(`${b.end_date.split(/\//)[2]}-${b.end_date.split(/\//)[0]}-${b.end_date.split(/\//)[1]}`)
                if (aSort > bSort) return 1 
                else return -1
            })
            setEndSort(prev => prev = 2)
            localStorage.setItem('sortType', 'start2')  
        } else {
            mainStore.products.sort((a, b) => {
                const aSort = new Date(`${a.end_date.split(/\//)[2]}-${a.end_date.split(/\//)[0]}-${a.end_date.split(/\//)[1]}`)
                const bSort = new Date(`${b.end_date.split(/\//)[2]}-${b.end_date.split(/\//)[0]}-${b.end_date.split(/\//)[1]}`)
                if (aSort < bSort) return 1 
                else return -1
            })
            setEndSort(prev => prev = 1)
            localStorage.setItem('sortType', 'start1')
            zeroSort('end')
            console.log(mainStore.products)
        }
    }


    return (
        <div className='main-page'>
            
            <div className="container">
                <div className="main-page__list-name">Карточки контента</div>
                {/* <select className='choose-language' onSelect={it => changeLanguage(it.currentTarget.value)}>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                </select> */}
                <div className="main-page-options">
                    <div className="main-page-options__sort">
                        Сортировать:
                        <button className={`main-page-options__sort-button ${nameSort == 0 ? 'sort-non-active' : 'sort-active'}`} onClick={() => sortByName()}>
                            {'по названию'}
                            {nameSort == 2 ? <i class="fa-solid fa-arrow-down-short-wide"></i> : 
                            nameSort == 1 ? <i class="fa-solid fa-arrow-down-wide-short"></i> : ''}
                        </button>
                        <button className={`main-page-options__sort-button ${viewSort == 0 ? 'sort-non-active' : 'sort-active'}`} onClick={() => sortByViews()}>
                            {'по просмотрам'}
                            {viewSort == 2 ? <i class="fa-solid fa-arrow-down-short-wide"></i> : 
                            viewSort == 1 ? <i class="fa-solid fa-arrow-down-wide-short"></i> : ''}
                        </button>
                        <button className={`main-page-options__sort-button ${startSort == 0 ? 'sort-non-active' : 'sort-active'}`} onClick={() => sortByStartDate()}>
                            {'по дате начала'}
                            {startSort == 2 ? <i class="fa-solid fa-arrow-down-short-wide"></i> : 
                            startSort == 1 ? <i class="fa-solid fa-arrow-down-wide-short"></i> : ''}
                        </button>
                        <button className={`main-page-options__sort-button ${endSort == 0 ? 'sort-non-active' : 'sort-active'}`} onClick={() => sortByEndDate()}>
                        {'по дате окончания'}
                            {endSort == 2 ? <i class="fa-solid fa-arrow-down-short-wide"></i> : 
                            endSort == 1 ? <i class="fa-solid fa-arrow-down-wide-short"></i> : ''}
                        </button>
                        {/* {nameSort || viewSort || startSort || endSort  ? <button className='main-page-options__sort-button' onClick={() => zeroSort('reset')}>{'сбросить'}</button> : ''} */}
                    </div>
                    <ShowAmount/>
                    <div className="main-page-options__search">
                        <input type="text" className="main-page-options__search__input" placeholder='Поиск...' onChange={e => mainStore.setSearch(e.target.value)}/>
                        <img src={SearchSVG} alt="" />
                    </div>
                </div>
                <Pagination/>
            </div>
        </div>
    )
})

export default MainPage;