import pr from '../assets/imgs/product.svg'
import ct from '../assets/imgs/category.svg'
import at from '../assets/imgs/attributes.svg'
import tag from '../assets/imgs/tags.svg'
import cp from '../assets/imgs/Nav → List → Item → Button → SVG.svg'
import or from '../assets/imgs/orders.svg'
import an from '../assets/imgs/an.svg'
import '../assets/styles/css/adminPanel.css'
import { apiMap } from '../utilites/apiMap.ts'
import { role } from '../utilites/axiosConfig.ts'
import  AuthStore  from '../stores/AuthStore.ts';
import { useState } from 'react';
import Workspace from '../components/adminpanel/Workspace.jsx'
export default function AdminPanel(){
    const [ mode, setMode]= useState(false)
    const [m, setM] = useState(0)
    role.post(apiMap.role.checkRole, {},{
        headers:{
            Authorization: 'Bearer '+ (AuthStore.getAuth()? AuthStore.getAuth(): localStorage.getItem('token'))}}).then((e)=>{setMode(e.data)})
    if(mode){
        return <div className='adminPanel'>
        <div className='sidebar'>
            <div className='productBlock block'>
                <h2>Товар</h2>
                <div className='product child_block'>
                    <div> 
                        <img src={pr} alt="product_icon" />
                        <p onClick={()=>{setM(1)}}>Товары</p>
                    </div>
                    <div>
                        <img src={ct} alt="category_icon" />
                        <p onClick={()=>{setM(2)}}>Категории</p>
                      
                    </div>
                    <div>
                        <img src={at} alt="attribute_icon" />
                        <p onClick={()=>{setM(3)}}>Атрибуты</p>
                     
                    </div>
                    <div>
                        <img src={tag} alt="tag_icon" />
                        <p onClick={()=>{setM(4)}}>Теги</p>
                    </div>
                </div>
            </div>
            <div className='orderBlock block'>
                <h2>Заказы</h2>
                <div className='orders child_block'>
                    <div> 
                        <img src={or} alt="product_icon" />
                        <p onClick={()=>{setM(5)}}>Заказы</p>
                    </div>
                </div>
            </div>
            <div className="couponBlock block">
                <h2>Купоны</h2>
                <div className="coupon child_block">
                    <div>
                        <img src={cp} alt="coupon" />
                        <p onClick={()=>{setM(6)}}>Купоны</p>
                    </div>
                </div>
                
            </div>
            <div className="couponBlock block">
                <h2>Аналитика</h2>
                <div className="coupon child_block">
                    <div>
                        <img src={an} alt="analitycs" />
                        <p onClick={()=>{setM(7)}}>Аналитика</p>
                    </div>
                </div>
                
            </div>
        </div>
        <Workspace m= {m}></Workspace>
    </div>
    }
    

}