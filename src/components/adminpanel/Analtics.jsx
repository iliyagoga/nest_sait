import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Ans } from "../../utilites/adminPanel/analitycs.ts";
import LineEl from "../charts/Line.jsx";
import AnalitycsStore from "../../stores/AnalitycsStore.ts";
import '../../assets/styles/css/analitycs.css'
import def from '../../assets/imgs/def.png'
import { apiMap } from "../../utilites/apiMap.ts";
const Analitycs = observer(()=>{
    const analitycs = new Ans()
    const [data, setData] = useState([1,2,3])
    const [mode,setMode]= useState(false)
    useEffect(()=>{
        analitycs.getOrderByWeek().then(v=>{AnalitycsStore.setOrders(v)}).catch(e=>{})
        analitycs.getCountUsers().then(v=>{AnalitycsStore.setCountUsers(v)}).catch(e=>{})
        analitycs.getTopProduct(5).then(v=>{AnalitycsStore.setTopProducts(v)}).catch(e=>{})
        analitycs.getTopCategory(5).then(v=>{AnalitycsStore.setTopCategories(v)}).catch(e=>{})
        analitycs.getTopCoupons(5).then(v=>{AnalitycsStore.setTopCoupons(v)}).catch(e=>{})
    },[])
    return <>
    <div className="analitycs">
        <div className="orders">
            <h3>Количество сделанных заказов</h3>
            <LineEl></LineEl>
            <div className="sbar">
                <p onClick={()=>{analitycs.getOrderByWeek().then(v=>{AnalitycsStore.setOrders(v)}).catch(e=>{})}}>Н</p>
                <p onClick={()=>{analitycs.getOrderByMounth().then(v=>{AnalitycsStore.setOrders(v)}).catch(e=>{})}}>М</p>
                <p onClick={()=>{analitycs.getOrderByYear().then(v=>{AnalitycsStore.setOrders(v)}).catch(e=>{})}}>Г</p>
            </div>
        </div>
        <div className="topProducts">
            <h3>Топ товаров по продажам</h3>
            {AnalitycsStore.getTopProducts()!=undefined&& AnalitycsStore.getTopProducts().map(v=>{
                return <div className="topProduct">
                    <div className="img">
                        <img src={v['previews'][0]!=undefined?apiMap.host +':'+ apiMap.port +'/'+ v['previews'][0].title:def} alt="" />
                    </div>
                       
                        <span>{v.productName}</span>
                        
                </div>
                })}
                <p className='more' onClick={()=>{  analitycs.getTopProduct(100000).then(v=>{AnalitycsStore.setTopProducts(v)}).catch(e=>{})}}>Показать больше...</p>
        </div>
        <div className="topCategories">
        <h3>Топ категорий по продажам</h3>
            {AnalitycsStore.getTopCategories()!=undefined&& AnalitycsStore.getTopCategories().map(v=>{
                return <div className="topCategory">
                       
                    <span>{v.categoryName}</span>
                        
                </div>
                })}
                <p className='more' onClick={()=>{  analitycs.getTopCategory(100000).then(v=>{AnalitycsStore.setTopCategories(v)}).catch(e=>{})}}>Показать больше...</p>
        </div>

        <div className="topCoupons">
        <h3>Топ используемых купонов</h3>
            {AnalitycsStore.getTopCoupons()!=undefined&& AnalitycsStore.getTopCoupons().map(v=>{
                return <div className="topCoupon">
                       
                    <span>{v.couponTitle}</span>
                        
                </div>
                })}
                <p className='more' onClick={()=>{  analitycs.getTopCoupons(100000).then(v=>{AnalitycsStore.setTopCoupons(v)}).catch(e=>{})}}>Показать больше...</p>
        </div>
        <div className="countUsers">
            <h3>Количество зарегистрированных пользователей</h3>
            <p>{AnalitycsStore.getCountUsers()}</p>
        </div>
        
    </div>
    </>
})

export default Analitycs