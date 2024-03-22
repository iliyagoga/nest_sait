import { useParams } from "react-router-dom";
import BreadCrumbs from "./Breadcrumbs";
import Header from "./Header";
import Client from "../../stores/Client.ts";
import { useEffect, useState } from "react";
import CatalogUtilite from "../../utilites/client/catalog.ts";
import '../../assets/styles/css/productpage.css'
import def from '../../assets/imgs/def.png'
import { apiMap } from "../../utilites/apiMap.ts";
import Product from "./Product.jsx";
import { CartUtilite } from "../../utilites/cart/cart.ts";
const { observer } = require("mobx-react-lite");


const ProductPage = observer(()=>{
    const fetchs= new CatalogUtilite()
    const pars= useParams()
    const [select, setSelect]= useState("null")
    useEffect(()=>{
       
        fetchs.getProduct(pars['id'])
    },[])

    if(Client.getProduct()!=undefined)
    return <div className="productpage">
        <Header theme={false}></Header>
        
        <div className="product">
            <div className="container">
                <div className="gallery">
                    <div className="preview">
                        <img src={Client.getProduct().res.previews[0]!=undefined?(apiMap.host+":"+apiMap.port+"/"+Client.getProduct().res.previews[0].title):def} alt="" />
                    </div>
                </div>
                <div className="info">
                    <span className="name">{Client.getProduct().res.productName}</span>
                    <p className="short">{Client.getProduct().res.title}</p>
                    <p className="price">{Client.getProduct().res.price} ₽</p>
                    {
                        Client.getProduct().variations&&<div className="variations">
                        <select name="" onChange={(e)=>{setSelect(e.target.value)}}id="">
                            <option value="null">Выберите {Client.getProduct().variations.attributeName}</option>
                            {Client.getProduct().variations.attributeValue.map(v=>{
                                return <option value={v.id}>{v.attributeValue}</option>
                            })}
                        </select>
                    </div>
                    }
                    <div className="incart" onClick={async ()=>{
                        const cart = new CartUtilite()
                        await cart.addToCart(Client.getProduct().res.id, Number(select), 1)
                    }}>
                        <span>В корзину</span>
                    </div>
                 
                    
                </div>
            </div>
            <div className="details">
                <h4>Описание</h4>
                <p>{Client.getProduct().res.description.length>0?Client.getProduct().res.description:'-'}</p>
                <div className="attributes">
                    <h5>Атрибуты</h5>
                    {Client.getProduct().ats.map(v=>{
                        return <div className="ul">
                            <span>{v.attributeName}</span>
                            <ul>
                                {v.attributeValue.map(el=>{
                                    return <li>- {el.attributeValue}</li>
                                })}
                            </ul>
                        </div>
                    })}
                </div>
            </div>
            <div className="recommendations">
                <h3>Вам может понравиться</h3>
                <div className="cont">
                    {Client.getProduct().recommendations&&Client.getProduct().recommendations.map(v=>{
                        return <Product product={v}></Product>
                    })}
                </div>
                   
            </div>
           
        </div>
    </div>
})

export default ProductPage