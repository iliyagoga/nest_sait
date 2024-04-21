import { observer } from "mobx-react-lite";
import Header from "../components/client/Header";
import BreadCrumbs from "../components/client/Breadcrumbs";
import CatalogUtilite from '../utilites/client/catalog.ts'
import { useEffect } from "react";
import Client from "../stores/Client.ts";

import '../assets/styles/css/catalog.css'
import Category from "../components/client/Category.jsx";
import { config } from "../config.ts";
import Product from "../components/client/Product.jsx";
import Footer from "../components/client/Footer.jsx";
import { useParams, useSearchParams } from "react-router-dom";

const Catalog = observer(()=>{
    const catalog = new CatalogUtilite()
    const params = useParams()
    useEffect(()=>{
        catalog.getCategories()
        if(params.search!=undefined){
            Client.setOrderFilter('null')
            catalog.getProducts('null','null','null',12,0,Client.getSearch() || params.search)
        }else
        catalog.getProducts('null', 'null', Client.getOrderFilter(), 12, 0)
    },[params.search])
    
    return <div className="catalog">
        <Header theme={false}></Header>
        <BreadCrumbs names={(params.search!=undefined?['Главная','Каталог',params.search]:['Главная','Каталог'])} links={[config.mean, config.catalog]}></BreadCrumbs>
        <div className="body">
            <div className="sidebar">
                <h3>Каталог</h3>
                <div className="groups">
                    {Client.getCategories()!=undefined&&Client.getCategories().map(v=>{
                        return <Category title={v} categories={v.category}></Category>
                    })}
                </div>
            </div>
            <div className="container">
                <div className="filters">
                    <div className="price">
                        <h4>Цена:</h4>
                        <select  onChange={(e)=>{
                            Client.setPriceFilter(e.target.value);
                            if(Client.getCategory()!=undefined){
                                catalog.getProductsCats(Client.getCategory().idGroup, Client.getCategory().idCat, Client.getPriceFilter(), Client.getRatingFilter(), Client.getOrderFilter(), 12, 0)
                            }
                            else{
                                catalog.getProducts(Client.getPriceFilter(), Client.getRatingFilter(), Client.getOrderFilter(), 12, 0)
                            }                            }}   name="" id="">
                            <option value="null">Нет</option>
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                    </div>
                    {/* <div className="rating">
                        <h4>Рейтинг:</h4>
                        <select onChange={(e)=>{
                            Client.setRatingFilter(e.target.value);
                            if(Client.getCategory()!=undefined){
                                catalog.getProductsCats(Client.getCategory().idGroup, Client.getCategory().idCat, Client.getPriceFilter(), Client.getRatingFilter(), Client.getOrderFilter(), 12, 0)
                            }
                            else{
                                catalog.getProducts(Client.getPriceFilter(), Client.getRatingFilter(), Client.getOrderFilter(), 12, 0)
                            }
                          
                            }}   name="" id="">
                            <option value="null">Нет</option>
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                    </div> */}
                    <div className="other">
                        <h4>Сортировать по:</h4>
                        <select value={Client.getOrderFilter()} onChange={(e)=>{
                            Client.setOrderFilter(e.target.value);
                            if(Client.getCategory()!=undefined){
                                catalog.getProductsCats(Client.getCategory().idGroup, Client.getCategory().idCat, Client.getPriceFilter(), Client.getRatingFilter(), Client.getOrderFilter(), 12, 0)
                            }
                            else{
                                catalog.getProducts(Client.getPriceFilter(), Client.getRatingFilter(), Client.getOrderFilter(), 12, 0)
                            }                            }}  name="" id="">
                            <option value="null">Нет</option>
                            <option value="asc">Новые</option>
                            <option value="desc">Старые</option>
                        </select>
                    </div>
                </div>
                <div className="products">
                    {Client.getProducts()!=undefined&&Client.getProducts().map(v=>{
                        return <Product product={v}></Product>
                    })}
                </div>
            </div>
         
        </div>
        <Footer></Footer>
        

    </div>
})

export default Catalog