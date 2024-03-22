import { observer } from "mobx-react-lite";
import def from '../../assets/imgs/def.png'
import { apiMap } from "../../utilites/apiMap.ts";
import SliderNumber from "./SliderNumber.jsx";
import del from '../../assets/imgs/DeleteCart.svg'
import { useState } from "react";

const Product = observer(({product})=>{
    const  [value, setValue] =useState(1)
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
            <SliderNumber value={value} setValue={setValue}></SliderNumber>
        </div>
        <div className="col5">
            <img src={del} alt="" />
        </div>
    </div>
})

export default Product