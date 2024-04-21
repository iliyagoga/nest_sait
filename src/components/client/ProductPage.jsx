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
import MiniModal from "../modals/modal.jsx";
import ErrorsStore from "../../stores/ErrorsStore.ts";
import btnd from '../../assets/imgs/btnd.svg'
const { observer } = require("mobx-react-lite");


const ProductPage = observer(()=>{
    const fetchs= new CatalogUtilite()
    const pars= useParams()
    const [select, setSelect]= useState("null")
    useEffect(()=>{
       
        fetchs.getProduct(pars['id']).then(()=>{setActualImg(Client.getProduct().res.previews[0]!=undefined?(apiMap.host+":"+apiMap.port+"/"+Client.getProduct().res.previews[0].title):def)}).catch()

    },[])
    const [modal,setModal] = useState(false)
    const handleClose=()=>{setModal(false)}

    const [modalE,setModalE] = useState(false)
    const handleClose2=()=>{setModalE(false)}
    const [actualImg, setActualImg] = useState(def)
    const [counter, setCounter] = useState(0)

    if(Client.getProduct()!=undefined)
    return <div className="productpage">
        <MiniModal handleClose={handleClose} show={modal} text={"Товар добавлен в корзину"} header={"Уведомление"}></MiniModal>
        <MiniModal handleClose={handleClose2} show={modalE} text={ErrorsStore.getErrorText()} header={"Уведомление"}></MiniModal>
        <Header theme={false}></Header>
        
        <div className="product">
            <div className="container">
                <div className="gallery">
                    {Client.getProduct().res.previews[0]!=undefined&&<div className="contGallery">
                        <div className="btnu" onClick={()=>{if(counter<0)setCounter(counter+10)}}>
                            <img src={btnd} alt="" />
                        </div>
                        <ul style={{top: counter+"rem", transitionDuration: '.4s', transitionTimingFunction: 'easy-in-out'}}>
                            <li onClick={()=>{setActualImg(apiMap.host+":"+apiMap.port+"/"+Client.getProduct().res.previews[0].title)}}>
                                <img src={Client.getProduct().res.previews[0]!=undefined?(apiMap.host+":"+apiMap.port+"/"+Client.getProduct().res.previews[0].title):def} alt="" />
                            </li>
                            {Client.getProduct().res.gallery.map(v=>{
                                return <li onClick={()=>{setActualImg(apiMap.host+":"+apiMap.port+"/"+v.title)}}>
                                    <img src={apiMap.host+":"+apiMap.port+"/"+v.title} alt="" />
                                </li>
                            })}
                        </ul>
                        <div className="btnd" onClick={()=>{if((Client.getProduct().res.previews.length-2)*10<counter)setCounter(counter-10)}}>
                            <img src={btnd} alt="" />
                        </div>
                    </div>}
                    <div className="preview">
                        <img src={actualImg} alt="" />
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
                                return <option value={v.variations[0].id}>{v.attributeValue}</option>
                            })}
                        </select>
                    </div>
                    }
                    <div className="incart" onClick={async ()=>{
                        try {
                            const cart = new CartUtilite()
                            const res = await cart.addToCart(Client.getProduct().res.id, Number(select), 1)
                            setModal(true)
                        } catch (error) {
                            setModalE(true)
                            ErrorsStore.setErrorText(error.response.data.message)
                        }
                      

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