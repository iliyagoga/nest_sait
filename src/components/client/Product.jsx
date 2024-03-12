import { observer } from "mobx-react-lite";
import { apiMap } from "../../utilites/apiMap.ts";
import def from '../../assets/imgs/def.png'

const Product = observer(({product})=>{
    console.log(product)
    return <div className="product">
        <div className="preview">
          <img src={product.previews[0]!=undefined?(apiMap.host+":"+ apiMap.port +'/'+ product.previews[0].title): def} alt="" />
        </div>
        <div className="price">
            <span>{product.price}</span>
        </div>
    </div>
})

export default Product