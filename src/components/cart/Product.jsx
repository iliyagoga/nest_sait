import { observer } from "mobx-react-lite";
import def from '../../assets/imgs/def.png'
import { apiMap } from "../../utilites/apiMap.ts";
import SliderNumber from "./SliderNumber.jsx";
import del from '../../assets/imgs/DeleteCart.svg'
import { useEffect, useState } from "react";
import { CartUtilite } from "../../utilites/cart/cart.ts";
import CartStore from "../../stores/CartStore.ts";
import { ProductCartStore } from "../../stores/ProductCartStore.ts";
import MiniModal from "../modals/modal.jsx";
import ErrorsStore from "../../stores/ErrorsStore.ts";

const Product = observer(({product})=>{
    const cart = new CartUtilite()
    const [res, setRes] = useState(undefined)
    const [sValue, setSValue]= useState(product.cartVarId)

    useState(()=>{
        if(product.attrValId){
            setRes(cart.filter(product.productId))
        }  
    },[])
    const [eMode, setEMode] = useState(false)
    const handleClose = ()=>{setEMode(false)}

    return <div className="productCart">
     <MiniModal
        header={"Уведомление"}
        handleClose={handleClose}
        show={eMode}
        text={ErrorsStore.getErrorText()}
        >

        </MiniModal>
        <div className="col1">
            <div className="img">
                <img src={product.previewTitle?apiMap.host+":"+apiMap.port+'/'+ product.previewTitle:def} alt="" />
            </div>
            <span>{product.productName}</span>
        </div>
        <div className="col2">
            <span className={product.productSalePrice==0?"price":"price thr"}>{product.productPrice} ₽</span>
            {product.productSalePrice>0&&<span className="sale_price">{product.productSalePrice} ₽</span>}
        </div>
        <div className="col3">
            <SliderNumber product={product}></SliderNumber>
        </div>
        <div className="col4">
            <select disabled={res==undefined?true:false}name="" value={sValue} onChange={async(e)=>{
                try {
                    await cart.changeVars(product.productId, sValue, e.target.value);
                    setSValue(e.target.value)
                } catch (error) {
                    setEMode(true)
                    ErrorsStore.setErrorText(error.response.data.message)
                }
                
                }} id="">
                <option value="null">Нет</option>
                {res!=undefined&&res.map(v=>{
                    return <option value={v.varId}>{v.attributeValue}</option>
                })}
            </select>
        </div>
        <div className="col5">
            <img src={del} onClick={async ()=>{
                const copy = Object.assign(CartStore.getCart())
                await cart.removeProduct(product.productId)
                CartStore.setCart([...copy.slice(0,copy.indexOf(product)),...copy.slice(copy.indexOf(product)+1)])
          
               
                
            }}alt="" />
        </div>
    </div>
})

export default Product