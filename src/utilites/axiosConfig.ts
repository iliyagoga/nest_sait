import axios from 'axios'
import { apiMap } from './apiMap.ts'

const auth= axios.create({
    baseURL: apiMap.host+":"+apiMap.port+ apiMap.auth.way
})
const role= axios.create({
    baseURL: apiMap.host+":"+apiMap.port+ apiMap.role.way
})

const filters = axios.create({
    baseURL: apiMap.host+":"+apiMap.port+ apiMap.filters.way
})

const products = axios.create({
    baseURL: apiMap.host+":"+apiMap.port+ apiMap.products.way
})

const cart = axios.create({
    baseURL: apiMap.host+":"+apiMap.port+ apiMap.cart.way
})

const coupons = axios.create({
    baseURL: apiMap.host+":"+apiMap.port+ apiMap.coupons.way
})



export {auth, role, filters, products, cart, coupons} 