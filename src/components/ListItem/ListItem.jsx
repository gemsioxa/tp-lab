import React from 'react'
import './ListItem.less'
import {Route, Routes, useNavigate, NavLink} from 'react-router-dom'
import ItemPage from '../ItemPage/ItemPage'
import { MAINPAGE_ROUTE } from '../../utils/consts'

const ListItem = ({item}) => {
  const navigate = useNavigate()

  return (
    <div className="main-page-list-item" onClick={() => navigate(`${MAINPAGE_ROUTE}/${item.id}`)}>
        {/* id использовать удобнее для доступа к ссылкам и красивее */}
          <div className="main-page-list-item__img">
              <img src={item.image_url} alt="#"  />
          </div>
          <div className="main-page-list-item__title">
              <h3 className="main-page-list-item__title__name">{item.name}</h3>
              <h3 className="main-page-list-item__title_category">{item.category}</h3>
          </div>
          <div className="main-page-list-item__views">{item.views}</div>
          <div className="main-page-list-item__start">{item.start_date.split('/')[1].length == 1 ? '0' + item.start_date.split('/')[1] : item.start_date.split('/')[1]}.
          {item.start_date.split('/')[0].length == 1 ? '0' + item.start_date.split('/')[0] : item.start_date.split('/')[0]}.
          {item.start_date.split('/')[2]}
          </div>
          <div className="main-page-list-item__end">{item.end_date.split('/')[1].length == 1 ? '0' + item.end_date.split('/')[1] : item.end_date.split('/')[1]}.
          {item.end_date.split('/')[0].length == 1 ? '0' + item.end_date.split('/')[0] : item.end_date.split('/')[0]}.
          {item.end_date.split('/')[2]}</div>
    </div>
  )
}
export default ListItem