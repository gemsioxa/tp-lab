import './ItemPage.less'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductsJSON from '../../db/products.json'
import DiscountIMG from '../../img/ItemPage/Discount.png'
import StarIMG from '../../img/ItemPage/star.png'
import FillStarIMG from '../../img/ItemPage/fill-star.png'


const ItemPage = observer(() => {

  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const [rating, setRating] = useState([])
  const {id} = useParams()

  useEffect( () => {
    (async () => {
      ProductsJSON.map(async item => {
        if (item.id == id) {
          await setProduct(() => item)

          for (let i = 0; i < 5; i++) {
            if (i < item.stars) {
              setRating(prev => [...prev, FillStarIMG])
            } else {
              setRating(prev => [...prev, StarIMG])
            }
          }
        }
      })
    })()    
  }, [])

  const starListing = rating?.map(rate => {
    return <img src={rate}></img>
  })

  return (
    <div className='item-page'>
      
      <div className='container'>
        <button className='item-page__back' onClick={() => navigate(`/`)}>
          <i className="fa-solid fa-angle-left" />
          Назад
        </button>
        <div className='padding-container'>
          <div className={product?.discount == 0 ? 'item-page-header item-page-header__zero' : 'item-page-header'}>
          {product?.discount == 0 ? null :
            <div className='item-page-header__discount'>
              <img src={DiscountIMG}></img>
              <h2>-{product?.discount}%</h2>
            </div>}
            <div className='item-page-header__logo'>
              <img src={product?.logo_url}></img> 
            </div>
          </div>
          <div className='item-page-main'>
            <div className='item-page-main__img'>
              <img src={product?.image_url}></img>
            </div>
            <div className='item-page-main__info'>
              <div className='item-page-main__name'>
                {product?.name}
              </div>
              <div className='item-page-main__stars'>
                {starListing}
              </div>
              {product?.discount == 0 ? 
              <div className='item-page-main__price item-page-main__price__zero'>
                <div className='item-page-main__price__new'>
                  <div className='item-page-main__price__num'>
                    {product?.new_price ? 
                    <p>{String(product?.new_price)?.split(',' || '.')[0]}
                      <span>{String(product?.new_price)?.split(',' || '.' || '')[1]?.length >= 2 ? String(product?.new_price)?.split(',' || '.' || '')[1]?.slice(0, 2) :
                      String(product?.new_price)?.split(',' || '.' || '')[1]?.length == 1 ? String(product?.new_price)?.split(',' || '.' || '')[1]?.slice(0, 2) + '0'
                        : "00"}</span>
                    </p>: 
                    product?.old_price ? <p>{String(product?.old_price)?.split(',' || '.')[0]}
                    <span>{String(product?.old_price)?.split(',' || '.' || '')[1]?.length >= 2 ? String(product?.old_price)?.split(',' || '.' || '')[1]?.slice(0, 2) :
                    String(product?.old_price)?.split(',' || '.' || '')[1]?.length == 1 ? String(product?.old_price)?.split(',' || '.' || '')[1]?.slice(0, 2) + '0'
                     : "00"}</span>
                    </p> : 'Бесплатно'}
                  </div>
                  <div className='item-page-main__price__info'>
                    Цена
                  </div>
                </div>
              </div>
              :
              <div className='item-page-main__price'>
                <div className='item-page-main__price__old'>
                  <div className='item-page-main__price__num'>
                    <p>{String(product?.old_price)?.split(',' || '.')[0]}
                    <span>{String(product?.old_price)?.split(',' || '.' || '')[1]?.length >= 2 ? String(product?.old_price)?.split(',' || '.' || '')[1]?.slice(0, 2) :
                    String(product?.old_price)?.split(',' || '.' || '')[1]?.length == 1 ? String(product?.old_price)?.split(',' || '.' || '')[1]?.slice(0, 2) + '0'
                     : "00"}</span>
                    </p>
                    <div className='item-page-main__price__num__line'/>
                  </div>
                  <div className='item-page-main__price__info'>
                    Старая цена
                  </div>
                </div>
                <div className='item-page-main__price__new'>
                  <div className='item-page-main__price__num'>
                    <p>{String(product?.new_price)?.split(',' || '.')[0]}
                      <span>{String(product?.new_price)?.split(',' || '.' || '')[1]?.length >= 2 ? String(product?.new_price)?.split(',' || '.' || '')[1]?.slice(0, 2) :
                      String(product?.new_price)?.split(',' || '.' || '')[1]?.length == 1 ? String(product?.new_price)?.split(',' || '.' || '')[1]?.slice(0, 2) + '0'
                        : "00"}</span>
                    </p>
                  </div>
                  <div className='item-page-main__price__info'>
                    Цена по акции
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
        <div className='item-page-footer'>
          <h3>
            Акция действует с 
            {' '}
            {product?.start_date?.split('/')[0].length == 1 ? '0' + product?.start_date?.split('/')[0] : product?.start_date?.split('/')[0]}.
            {product?.start_date?.split('/')[1].length == 1 ? '0' + product?.start_date?.split('/')[1] : product?.start_date?.split('/')[1]}.
            {product?.start_date?.split('/')[2]}
            {' '}
            по 
            {' '}
            {product?.end_date?.split('/')[0].length == 1 ? '0' + product?.end_date?.split('/')[0] : product?.end_date?.split('/')[0]}.
            {product?.end_date?.split('/')[1].length == 1 ? '0' + product?.end_date?.split('/')[1] : product?.end_date?.split('/')[1]}.
            {product?.end_date?.split('/')[2]}
            {' '}
          </h3>
          <p>{product?.disclaimer}</p>
        </div>
      </div>
    </div>
  )
})

export default ItemPage
