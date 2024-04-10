import { observer } from "mobx-react-lite";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import Pagination from "../Pagination.jsx";
import { useEffect, useState } from "react";
import { Orders } from "../../utilites/adminPanel/orders.ts";
import pen from'../../assets/imgs/Frame (3).svg'
import th from '../../assets/imgs/Vector (4).svg'
import RedactModal from "../modals/redactModal.jsx";
import Order from "./Order.jsx";
const OrdersViews = observer(()=>{

    const [show, setShow] = useState(false);
    const [remAll, setRemAll]= useState(false);
    const [o,sO]= useState(false)

    const [reStatusOrderId, setReStatusOrderId] = useState(null);

    const [status, setStatus]= useState("")
    const panel = new Orders();
    useEffect(()=>{
        panel.getOrders(0,6);
        panel.getCountPages();
    },[])

    const handleClose = () => setShow(false);
    return <>
    {!o?
        <div className="orderView">
            <RedactModal
            handleClose={handleClose}
            show={show}
            he={"Обновление статуса заказа"}
            body={
                <>
                <div className="m_status">
                    <select value={status}  onChange={e=>{
                        setStatus(e.target.value);
                        }} name="" id="">
                        <option value="0">Новый</option>
                        <option value="1">В процессе</option>
                        <option value="2">Завершенный</option>
                    </select>
                </div>
                </>
            }
            func={()=>{
                panel.updateStatus(reStatusOrderId,status)
            }}
            >

            </RedactModal>
            <div className="container">

                    <div className="container_header">
                        <span onClick={async ()=>{ await panel.getOrders(AdminPanelStore.getOrderPage());}}>Все заказы</span>
                        { <span className="r" onClick={
                            async()=>{
                                await panel.deleteOrders();
                                AdminPanelStore.clearDeleteOrders();
                                setRemAll(false)
                                }
                            }>Удалить</span> }
                    </div>
                    <div className="container_table">
                        <div className="col0 col2">
                            <h3 className="name col_header" >Статус</h3>
                            {AdminPanelStore.getOrders()!=undefined&&AdminPanelStore.getOrders().map(v=>{
                                return <div className="title" onClick={async ()=>{
                                    AdminPanelStore.setOrderId(v.id);
                                    sO(true)
                                    }}>
                                    <img src={th} alt="" />
                                    <p> {v.orderStatus} </p>
                                    <h4>Заказ №{v.id}</h4>
                                </div>
                            })}
                        </div>
                        <div className="col0 col4">
                            <div className="header_redact col_header">
                                <h3>Изменить статус заказа</h3>
                            </div>
                            {AdminPanelStore.getOrders()!=undefined&&AdminPanelStore.getOrders().map(v=>{
                                    return  <div className="redact" onClick={()=>{
                                        setShow(!show)
                                        setReStatusOrderId(v.id);
                                        setStatus(AdminPanelStore.getStatus(v.id))
                                        }}>
                                    <img src={pen} alt="" />
                                </div>
                            })}
                        </div>
                        <div className="col0 col1">
                            <div className="remove col_header">
                                    <div className={"checkbox "} 
                                    onClick={()=>{
                                        setRemAll(!remAll)
                                        if(!remAll)
                                            AdminPanelStore.setAllDeleteOrders()
                                        else
                                            AdminPanelStore.clearDeleteOrders()
                                        }}
                                        >
                                        <div className={"bhh "+ (remAll&&'checkbox_active')}></div>
                                    </div>
                            </div>
                
                            {AdminPanelStore.getOrders()!=undefined&&AdminPanelStore.getOrders().map((v,i)=>{
                                return <div className="rem">
                                            <div className={"checkbox "} 
                                            onClick={()=>{
                                                AdminPanelStore.setDeleteOrders(i,v.id)
                                            }
                                                }
                                                >
                                                <div className={"bhh "+ (AdminPanelStore.getDeleteOrder(i).mode&&'checkbox_active')}></div>
                                            </div>
                                        </div>
                            })}
                        </div>
                    </div>
                <Pagination
                        actualPage={AdminPanelStore.getOrderPage()}
                        countPages={AdminPanelStore.getCountOrderPages()}
                        func={ a=>{
                            panel.getOrders(a,6);}}
                        setPage={a=>AdminPanelStore.setOrderPage(a)}
                    >
                    </Pagination>
                </div>
            </div>:
            <Order sO={()=>{sO(false)}}></Order>
}
    </>
})
export default OrdersViews