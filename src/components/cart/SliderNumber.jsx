import { observer } from "mobx-react-lite";
import { CartUtilite } from "../../utilites/cart/cart.ts";
import { useState } from "react";
import CartStore from "../../stores/CartStore.ts";
import Product from "./Product.jsx";

const SliderNumber= observer(({product})=>{
    const cart = new CartUtilite()
    return <div className="cartSlider">
        <div className="lB" onClick={async()=>{
            if(product.count>1){
                CartStore.clearProduct()
                const res= await cart.minusProduct(product.productId, product.cartVarId);
            }
        }}>
            <span>-</span>
        
        </div>
        <div className="value">
            <p>{product.count}</p>
        </div>
        <div className="rB" onClick={async()=>{
            CartStore.clearProduct()
            const res = await cart.plusProduct(product.productId, product.cartVarId);
            }}>
                
            <span>+</span>
        </div>
    </div>
})

export default SliderNumber