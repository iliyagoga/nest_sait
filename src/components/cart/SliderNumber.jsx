import { observer } from "mobx-react-lite";
import { CartUtilite } from "../../utilites/cart/cart.ts";
import { useState } from "react";

const SliderNumber= observer(({product})=>{
    const cart = new CartUtilite()
    return <div className="cartSlider">
        <div className="lB" onClick={async()=>{
            if(product.cart[0].count>1){
                const res= await cart.minusProduct(product.id)
            }
        }}>
            <span>-</span>
        
        </div>
        <div className="value">
            <p>{product.cart[0].count}</p>
        </div>
        <div className="rB" onClick={async()=>{
            const res = await cart.plusProduct(product.id)}}>
            <span>+</span>
        </div>
    </div>
})

export default SliderNumber