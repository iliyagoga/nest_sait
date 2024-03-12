import { observer } from "mobx-react-lite";
import { apiMap } from "../../utilites/apiMap.ts";
import def from '../../assets/imgs/def.png'
import elipse from '../../assets/imgs/Ellipse 2.svg'
import elipse_2 from '../../assets/imgs/Ellipse 1.svg'
import Client from "../../stores/Client.ts";
const Product = observer(({product})=>{
    console.log(product)
    return <div className="product">
        <div className="preview">
            <div className="rating">
                {product.ratingCount!=0?Array(Math.floor(product.rating/product.ratingCount)).map(v=>{return <img src={elipse}/>}): [1,2,3,4,5].map(v=>{return <img  className="rat" src={elipse_2}/>})}
            </div>
            {( (new Date()-new Date(432000))>new Date(product.createdAt))&&<div className="new">
                <span>New</span>
            </div>}
            <img src={product.previews[0]!=undefined?(apiMap.host+":"+ apiMap.port +'/'+ product.previews[0].title): def} alt="" />
        </div>
        <div className="title">
            <span>{product.productName}</span>
        </div>
        <div className="price">
            <span className={product.sale_price?"old": ""}>{product.price} ₽</span>
            {product.sale_price!=0&&<span className="sale">{product.sale_price} ₽</span>}
        </div>
    </div>
})

export default Product