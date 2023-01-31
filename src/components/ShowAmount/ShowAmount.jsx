import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import './ShowAmount.less'

export default function ShowAmount() {

    const { mainStore } = useContext(Context)
    const [chooseAmount, setChooseAmount] = useState(0)

    useEffect(() => {
        localStorage.getItem('limit') ? 
        mainStore.setLimit(localStorage.getItem('limit')) : ''
    })
    function chooseDisplayAmount (amount) {
        setChooseAmount(0)
        mainStore.setLimit(amount)
        localStorage.setItem('limit', amount)
    }
    return (
    <div className='main-page-options__amount'>
        <div className='main-page-options__amount-description'>
                Отображать по: 
        </div>
        <div className='main-page-options__amount-options'>
            
            <button className='main-page-options__amount-options__button' onClick={() => setChooseAmount(chooseAmount ? 0 : 1)}>{localStorage.getItem('limit') || mainStore.limit}</button>
            {chooseAmount ? 
            <div className='main-page-options__amount-options__choose'>
                <button className='main-page-options__amount-options__choose__item' onClick={() => chooseDisplayAmount(5)}>5</button>
                <button className='main-page-options__amount-options__choose__item' onClick={() => chooseDisplayAmount(10)}>10</button>
                <button className='main-page-options__amount-options__choose__item' onClick={() => chooseDisplayAmount(15)}>15</button>
            </div> : ''}
        </div>
    </div>
    )
}
