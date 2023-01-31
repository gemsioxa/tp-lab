import React, {useState, useEffect, useContext} from 'react'
import ListItem from '../ListItem/ListItem'
import './List.less'
import ProductsJson from '../../db/products.json'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { fetchProducts } from '../../http/productApi'

const List = observer(() => {

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
            <div className="main-page-list__title__img">Фото</div>
            <div className="main-page-list__title__name">Название</div>
            <div className="main-page-list__title__views">Просмотры</div>
            <div className="main-page-list__title__start">Начало ротации</div>
            <div className="main-page-list__title__end">Конец ротации</div>
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