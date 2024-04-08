import { observer } from "mobx-react-lite";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import Pagination from "../Pagination.jsx";
import { useEffect, useState } from "react";
import { Orders } from "../../utilites/adminPanel/orders.ts";
import pen from'../../assets/imgs/Frame (3).svg'
import th from '../../assets/imgs/Vector (4).svg'
const OrdersViews = observer(()=>{

    const [show, setShow] = useState(false);
    const [rA, setRA] = useState(false);
    const [remAll, setRemAll]= useState(false);


    const [ca, setCa] = useState(false);
    const [renameOrder, setRenameOrder] = useState("");
    const [renameOrderId, setRenameOrderId] = useState(null);
    const panel = new Orders();
    useEffect(()=>{
        panel.getOrders(0,6);
        panel.getCountPages();
    },[])
    return <>
    <div className="orderView">
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
                                panel.getCountOrderPages(AdminPanelStore.getOrderId());
                                setShow(!show)
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
                                    setRenameOrder(v.OrdeributeName);
                                    setRA(true);
                                    setRenameOrderId(v.id);
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
        </div>
    </>
})
export default OrdersViews