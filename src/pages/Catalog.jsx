import { observer } from "mobx-react-lite";
import Header from "../components/client/Header";
import BreadCrumbs from "../components/client/Breadcrumbs";
import CatalogUtilite from '../utilites/client/catalog.ts'
import { useEffect } from "react";
import Client from "../stores/Client.ts";

import '../assets/styles/css/catalog.css'

const Catalog = observer(()=>{
    const catalog = new CatalogUtilite()
    useEffect(()=>{
        catalog.getGroups()
    },[])
    return <div className="catalog">
        <Header theme={false}></Header>
        <BreadCrumbs></BreadCrumbs>
        <div className="body">
            <div className="sidebar">
                <h3>Каталог</h3>
                <div className="groups">
                    {Client.getGroups()!=undefined&&Client.getGroups().map(v=>{
                        return <div className="ul">
                            <span>{v.groupTitle}</span>
                        </div>
                    })}
                </div>
            </div>
            <div className="container">
                <div className="filters">
                    <div className="price">
                        <h4>Цена:</h4>
                        <select name="" id="">
                            <option value="null">Нет</option>
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                    </div>
                    <div className="rating">
                        <h4>Рейтинг:</h4>
                        <select name="" id="">
                            <option value="null">Нет</option>
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                    </div>
                    <div className="other">
                        <h4>Сортировать по:</h4>
                        <select name="" id="">
                            <option value="null">Нет</option>
                            <option value="asc">Новые</option>
                            <option value="desc">Старые</option>
                        </select>
                    </div>
                </div>
            </div>
         
        </div>
        

    </div>
})

export default Catalog