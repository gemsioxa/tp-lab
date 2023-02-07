import React, {useState, useEffect, useContext, useTransition} from 'react'
import ListItem from '../ListItem/ListItem'
import './List.less'
import ProductsJson from '../../db/products.json'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { fetchProducts } from '../../http/productApi'
import { useTranslation } from 'react-i18next'
// import '../../i18next'

const List = observer(() => {

  const { t } = useTranslation()
  const { mainStore } = useContext(Context)
  
  const filteredProducts = mainStore.products.filter(product => {
    return product.name.toLowerCase().includes(mainStore.search.toLowerCase()) || product.category.toLowerCase().includes(mainStore.search.toLowerCase())
  })

  useEffect(() => {
    fetchProducts()
    .then(data => mainStore.setProducts(ProductsJson))
  }, [])

  useEffect(() => {
    if (filteredProducts.length == 0) {
      mainStore.setZeroCount()
    } else mainStore.setTotalCount(filteredProducts.length)
  }, [filteredProducts])

  return (
    <div className="main-page-list">
        <div className="main-page-list__title">
            <div className="main-page-list__title__img">{t('common.mainPage.product-image')}</div>
            <div className="main-page-list__title__name">{t('common.mainPage.product-name')}</div>
            <div className="main-page-list__title__views">{t('common.mainPage.product-views')}</div>
            <div className="main-page-list__title__start">{t('common.mainPage.product-start-date')}</div>
            <div className="main-page-list__title__end">{t('common.mainPage.product-end-date')}</div>
        </div>
        <>
          {filteredProducts.slice(mainStore.firstIndex, mainStore.lastIndex).map(item => {
            return <ListItem key={item.id} item={item}/>
          })}
        </>
    </div>
  )
})
export default List;