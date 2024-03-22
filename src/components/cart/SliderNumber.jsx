import { observer } from "mobx-react-lite";

const SliderNumber= observer(({value, setValue})=>{
    return <div className="cartSlider">
        <div className="lB" onClick={()=>{
            if(value>1){
                setValue(value-1)
            }
        }}>
            <span>-</span>
        
        </div>
        <div className="value">
            <p>{value}</p>
        </div>
        <div className="rB" onClick={()=>{setValue(value+1)}}>
            <span>+</span>
        </div>
    </div>
})

export default SliderNumber