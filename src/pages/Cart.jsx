import { useEffect } from "react";
import BreadCrumbs from "../components/client/Breadcrumbs";
import Header from "../components/client/Header";
import { config } from "../config.ts";
import { CartUtilite } from "../utilites/cart/cart.ts";
import CartStore from "../stores/CartStore.ts";
import Product from "../components/cart/Product.jsx";
import '../assets/styles/css/cart.css'
const { observer } = require("mobx-react-lite");

const Cart = observer(()=>{
    useEffect(()=>{
        const cart = new CartUtilite()
        cart.getCart()
    },[])
    return <>
        <Header theme={false}></Header>
        <div className="cart">
        <BreadCrumbs names={['Главная', 'Корзина']} links={[config.mean, config.cart]}></BreadCrumbs>
        <div className="container_c">
            <h3>Ваш заказ</h3>
            <div className="cont">
                {CartStore.getCart().map(v=>{
                    return <Product product={v}></Product>
                })}
            </div>

        </div>
    </div>
    </>
})

export default Cart