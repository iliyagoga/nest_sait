import { observer } from "mobx-react-lite";
import def from '../../assets/imgs/def.png'
import { apiMap } from "../../utilites/apiMap.ts";
import SliderNumber from "./SliderNumber.jsx";
import del from '../../assets/imgs/DeleteCart.svg'
import { useEffect, useState } from "react";
import { CartUtilite } from "../../utilites/cart/cart.ts";
import CartStore from "../../stores/CartStore.ts";
import { ProductCartStore } from "../../stores/ProductCartStore.ts";

const Product = observer(({product})=>{
    const cart = new CartUtilite()
    const {res, ac}=cart.filter(product.id)
    const [sValue, setSValue]= useState(ac?ac['id']:"")


    return <div className="productCart">
        <div className="col1">
            <div className="img">
                <img src={product.previews.length>0?apiMap.host+":"+apiMap.port+'/'+ product.previews[0].title:def} alt="" />
            </div>
            <span>{product.productName}</span>
        </div>
        <div className="col2">
            <span className={product.sale_price==0?"price":"price thr"}>{product.price} ₽</span>
            {product.sale_price>0&&<span className="sale_price">{product.sale_price} ₽</span>}
        </div>
        <div className="col3">
            <SliderNumber product={product}></SliderNumber>
        </div>
        <div className="col4">
            <select disabled={res[0]==undefined?true:false}name="" value={sValue} onChange={(e)=>{setSValue(e.target.value)}} id="">
                <option value="null">Нет</option>
                {res[0]!=undefined&&res[0].attributeValue.map(v=>{
                    return <option value={v.id}>{v.attributeValue}</option>
                })}
            </select>
        </div>
        <div className="col5">
            <img src={del} onClick={async ()=>{
                const copy = Object.assign(CartStore.getCart())
                await cart.removeProduct(product.id)
                CartStore.setCart([...copy.slice(0,copy.indexOf(product)),...copy.slice(copy.indexOf(product)+1)])
          
               
                
            }}alt="" />
        </div>
    </div>
})

export default Product