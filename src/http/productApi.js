import axios from 'axios'
import ProductsJson from '../db/products.json'

export const fetchProducts = async () => {
    const {data} = axios.get(__dirname, '../../db/products.json')
    return data
}