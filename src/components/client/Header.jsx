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
const Header = observer(({theme=true})=>{
    const nav = useNavigate()
    return <header className={theme?"":"black h"}>
        <div className={theme?"left": "left black"}>
            <span>
                New
            </span>
            <span onClick={()=>{nav(config.catalog)}}>
                Каталог
            </span>
            <span>
                Категории
            </span>
        </div>
        <div className="logo">

        </div>
        <div className={theme?"icons": "icons black"}>
        {theme?   <>
            <img src={search} alt="" />
            <img onClick={()=>{nav(config.profile)}} src={accaunt} alt="" />
            <img onClick={()=>{nav(config.cart)}}src={cart} alt="" />
           </> 
            :
           <>
           <img src={b_search} alt="" />
            <img onClick={()=>{nav(config.profile)}} src={b_accaunt} alt="" />
            <img onClick={()=>{nav(config.cart)}} src={b_cart} alt="" />
           </>
        }

           
        </div>
    </header>
})
export default Header