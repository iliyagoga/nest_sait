import { observer } from "mobx-react-lite";
import search from '../../assets/imgs/search_white.svg'
import accaunt from '../../assets/imgs/accaunt.svg'
import cart from '../../assets/imgs/cart.svg'
import b_search from '../../assets/imgs/b_search.svg'
import b_accaunt from '../../assets/imgs/b_accaunt.svg'
import b_cart from '../../assets/imgs/b_cart.svg'
import '../../assets/styles/css/header.css'
import { useNavigate } from "react-router-dom";
import { config } from "../../config.ts";
import CartStore from "../../stores/CartStore.ts";
import Client from "../../stores/Client.ts";
import { useEffect, useState } from "react";
import { CartUtilite } from "../../utilites/cart/cart.ts";
import Search from "./Search.jsx";
const Header = observer(({theme=true})=>{
    const nav = useNavigate()
    const [click, setClick]= useState(true)
    useEffect(()=>{
        const cart = new CartUtilite();
        cart.countAll()
    },[])
    return <>
    <header className={theme?"":"black h"}>
        <div className={theme?"left": "left black"}>
            <span onClick={()=>{nav(config.mean);}}>
                Главная
            </span>
            <span onClick={()=>{Client.setOrderFilter('asc');nav(config.catalog);}}>
                New
            </span>
            <span onClick={()=>{Client.setOrderFilter('null');nav(config.catalog)}}>
                Каталог
            </span>
           
        </div>
        <div className="logo">

        </div>
        <div className={theme?"icons": "icons black"}>
        {theme?   <>
            <img onClick={()=>{setClick(!click)}} src={search} alt="" />
            <img onClick={()=>{nav(config.profile)}} src={accaunt} alt="" />
            <img onClick={()=>{nav(config.cart)}}src={cart} alt="" />
           </> 
            :
           <>
           <img onClick={()=>{setClick(!click)}} src={b_search} alt="" />
            <img onClick={()=>{nav(config.profile)}} src={b_accaunt} alt="" />
            <div className="cartimg">
                <div className="count">
                    <p>{CartStore.getCount()}</p>
                </div>
                <img onClick={()=>{nav(config.cart)}} src={b_cart} alt="" />
            </div>
         
           </>
        }

           
        </div>
    </header>
    <Search click={click}></Search>
    </>
})
export default Header