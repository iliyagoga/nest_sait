import { observer } from "mobx-react-lite";
import back from '../../assets/imgs/Vector (6).svg'
import '../../assets/styles/css/order.css'
import { useEffect, useState } from "react";
import { Orders } from "../../utilites/adminPanel/orders.ts";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import date from '../../assets/imgs/date.svg'
const Order= observer(({sO})=>{
    const panel= new Orders()
    const [status, setStatus] = useState("")
    useEffect(()=>{
        panel.getOrder(AdminPanelStore.getOrderId()).then(e=>{
            setStatus(AdminPanelStore.getOneStatus(AdminPanelStore.getOrder().order.orderStatus));
        }).catch(()=>{})

    },[])
    return <>
    {AdminPanelStore.getOrder()!=undefined&&
    <div className="order">
        <div className="back" onClick={()=>sO()}>
                <img src={back} alt="" />
                <p>Заказы</p>
        </div>
        <div className="o_header">
            <div className="l">
                <h2>DEV-{AdminPanelStore.getOrder().order.id}</h2>
                <div className="date">
                    <span>Создан</span>
                    <img src={date} alt="" />
                    <h4>{ new Date(AdminPanelStore.getOrder().order.createdAt).getDate()}-{ new Date(AdminPanelStore.getOrder().order.createdAt).getMonth()+1}-{ new Date(AdminPanelStore.getOrder().order.createdAt).getFullYear()} { new Date(AdminPanelStore.getOrder().order.createdAt).getHours()}:{ new Date(AdminPanelStore.getOrder().order.createdAt).getMinutes()}</h4>  
                </div>
            </div>
            <div className="r">
                
            </div>
        </div>
        <div className="o_basicInfo">
            <div className="o_basicInfo_h">
                <h4>Информация о заказе</h4>
            </div>
            <div className="o_basicInfo_c">
                <div className="user">
                    <div className="l">
                        <span>Заказчик</span>
                    </div>
                    <div className="r">
                        <p>{AdminPanelStore.getOrder().user.firstName} {AdminPanelStore.getOrder().user.secondName}</p>
                    </div>
                </div>
                <div className="date">
                    <div className="l">
                        <span>Дата заказа</span>
                    </div>
                    <div className="r">
                        <p>{ new Date(AdminPanelStore.getOrder().order.createdAt).getDate()}-{ new Date(AdminPanelStore.getOrder().order.createdAt).getMonth()+1}-{ new Date(AdminPanelStore.getOrder().order.createdAt).getFullYear()} { new Date(AdminPanelStore.getOrder().order.createdAt).getHours()}:{ new Date(AdminPanelStore.getOrder().order.createdAt).getMinutes()}</p>  
                    </div>
                </div>
                <div className="payment">
                    <div className="l">
                        <span>Вид оплаты</span>
                    </div>
                    <div className="r">
                        <p>{AdminPanelStore.getOrder().order.payment===null?'Наличными':AdminPanelStore.getOrder().order.payment===true?'Картой':'СПБ'}</p>
                    </div>
                </div>
                <div className="delivery">
                    <div className="l">
                        <span>Доставка</span>
                    </div>
                    <div className="r">
                        {AdminPanelStore.getOrder().order.deliv===null&&<p>Самовывоз</p>}
                        {AdminPanelStore.getOrder().order.deliv===false&&<>
                            <div className="cont">
                                <p>Почта</p>
                                <span>г. {AdminPanelStore.getOrder().addres.city}, п.о. {AdminPanelStore.getOrder().addres.home}</span>
                            </div>
                        </>}
                        {AdminPanelStore.getOrder().order.deliv===true&&<>
                            <div className="cont">
                                <p>Адрес:</p>
                                <span>{AdminPanelStore.getOrder().addres.country}, г. {AdminPanelStore.getOrder().addres.city}</span>
                                <span>ул. {AdminPanelStore.getOrder().addres.street}, д. {AdminPanelStore.getOrder().addres.home}, кв. {AdminPanelStore.getOrder().addres.flat}</span>
                            </div>
                        </>}
                    </div>
                </div>
                <div className="status">
                    <div className="l">
                        <span>Статус заказа</span>
                    </div>
                    <div className="r">
                        <select value={status}  onChange={e=>{
                            setStatus(e.target.value);
                            }} name="" id="">
                            <option value="0">Новый</option>
                            <option value="1">В процессе</option>
                            <option value="2">Завершенный</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>}
    </>
})
export default Order