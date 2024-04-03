import { observer } from "mobx-react-lite";
import { CartUtilite } from "../../utilites/cart/cart.ts";

const SliderNumber= observer(({value, setValue,productId})=>{
    console.log(value)
    const cart = new CartUtilite()
    return <div className="cartSlider">
        <div className="lB" onClick={async()=>{
            if(value>1){
                const res= await cart.minusProduct(productId)
                if(res)
                setValue(value-1)
            }
        }}>
            <span>-</span>
        
        </div>
        <div className="value">
            <p>{value}</p>
        </div>
        <div className="rB" onClick={async()=>{
            const res = await cart.plusProduct(productId)
            if(res)
            setValue(value+1)}}>
            <span>+</span>
        </div>
    </div>
})

export default SliderNumber