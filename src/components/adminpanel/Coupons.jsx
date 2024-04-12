import { observer } from "mobx-react-lite";
import { CouponUtilite } from "../../utilites/adminPanel/coupons.ts";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { useEffect, useState } from "react";
import CreateModal from "../modals/createCustom";
import pen from'../../assets/imgs/Frame (3).svg'
import { Form } from "react-router-dom";
import RedactModal from "../modals/redactModal";
import MiniModal from "../modals/modal";
import Pagination from "../Pagination";
import MiddleModal from "../modals/middleModal.jsx";

const Coupons=observer(()=>{
    const panel = new CouponUtilite();
    useEffect(()=>{
        panel.getCoupons(0,6,null)
        panel.getCouponsPages(6)
    },[])

    const [check,setCheck]= useState(false)
    const [show, setShow] = useState(false)
    const [mini, setMini] = useState(false)
    const [view, setView] = useState(false)
    const [r, setR] = useState(false);
    const [errorText, setErrorText]= useState("");
    const [value, setValue] = useState("")
    const [title, setTitle] = useState("")
    const [timeLife, setTimeLife] = useState("")
    const [id, setId]= useState(null)
    const [select, setSelect] = useState(null)

    const handleClose = () => setShow(false);
    const handleClose2 = () => setMini(false);
    const handleClose3 = () => setR(false);
    const handleClose4 = () => setView(false);


    return <>

    <CreateModal
        handleClose={handleClose} 
        show={show} 
        he={'Создание купона'}
        body={
            <>
            <div className="m_coupons">
                <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Название"/>
                <input type="text" value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder="Величина скидки в рублях"/>
                <input type="date" value={timeLife} onChange={(e)=>{setTimeLife(e.target.value)}}/>
            </div>
            </>
            } 
        func={async ()=>{
            try {
                if(title.length>0 && value.length>0 && timeLife.length>0){
                    await panel.createCoupon(title,value, new Date(timeLife).getTime())
                    setTitle("")
                    setValue("")
                    setTimeLife("")
                }
            } catch (error) {
                AdminPanelStore.setTagTitle("");
                setErrorText(error.response.data.message)
                setMini(true)
            }
        }} >
    </CreateModal>

    <RedactModal
        handleClose={handleClose3} 
        show={r} 
        he={"Редактирование купона"}
        body={
            <div className="m_coupons">
            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Название"/>
            <input type="text" value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder="Величина скидки в рублях"/>
            <input type="date" value={timeLife} onChange={(e)=>{setTimeLife(e.target.value)}}/>
        </div>
        } 
        func={async ()=>{   
            await panel.redactCoupon(id, title,value, new Date(timeLife).getTime());
            setTitle("")
            setValue("")
            setTimeLife("")
            }}> 
    </RedactModal>

    <MiniModal
        handleClose={handleClose2} 
        show={mini} 
        text={errorText}>
    </MiniModal>
    <MiddleModal
        handleClose={handleClose4}
        show={view}
        he={"Просмотр купона"}
        body={
            <div className="m_coupons">
            <input disabled type="text" value={title} />
            <input disabled type="text" value={value} />
            <input disabled type="date" value={timeLife} />
        </div>
        } 
    >


    </MiddleModal>

    <div className="tagVIew">
        <div className="container">
            <div className="container_header">
                <span onClick={async ()=>{ await  panel.getCoupons(0,6,select)}}>Все теги</span>
                <span onClick={()=>{setShow(true); }}>Добавить</span>
                <span className="r" onClick={
                    async()=>{
                        await panel.deleteCoupon(AdminPanelStore.getDeleteCouponsIds());
                        AdminPanelStore.clearDeleteCoupons();
                        setCheck(false)
                        }
                    }>Удалить</span>
            </div>
            <div className="c_sort">
                    <span>Сортировать по времени жизни:</span>
                    <select name="" value={select} onChange={(e)=>{
                        setSelect(e.target.value)
                        panel.getCoupons(0,6, e.target.value)

                        }}id="">
                        <option value="null">Нет</option>
                        <option value="true">Новые</option>
                        <option value="false">Истекающие</option>
                    </select>
            </div>
            <div className="container_table">
                <div className="col0 col1">
                    <div className="remove col_header">
                            <div className={"checkbox "} onClick={()=>{
                                setCheck(!check)
                                if(!check)
                                    AdminPanelStore.setAllDeleteCoupons()
                                else
                                    AdminPanelStore.clearDeleteCoupons()
                                }}>
                                <div className={"bhh "+ (check&&'checkbox_active')}></div>
                            </div>
                    </div>
        
                    {AdminPanelStore.getCoupons()!=undefined&&AdminPanelStore.getCoupons().map((v,i)=>{
                        return <div className="rem">
                                    <div className={"checkbox "} onClick={()=>{
                                        AdminPanelStore.setDeleteCoupons(i,v.id)
                                    }
                                        }>
                                        <div className={"bhh "+ (AdminPanelStore.getDeleteCoupon(i).mode&&'checkbox_active')}></div>
                                    </div>
                                </div>
                    })}
                </div>
                <div className="col0 col2">
                    <h3 className="name col_header" >Название</h3>
                    {AdminPanelStore.getCoupons()!=undefined&&AdminPanelStore.getCoupons().map(v=>{
                        return <div className="title" onClick={()=>{
                            setTitle(v.couponTitle)
                            setValue(v.couponValue)
                            setTimeLife(new Date(Number(v.couponTimelife)).getFullYear()+'-'+(String(new Date(Number(v.couponTimelife)).getMonth()).length==1?('0'+new Date(Number(v.couponTimelife)).getMonth()):new Date(Number(v.couponTimelife)).getMonth())+'-'+new Date(Number(v.couponTimelife)).getDate())
                            setView(true)
                        }}>
                            <p> {v.couponTitle} </p>
                        </div>
                    })}
                </div>
                <div className="col0 col3">
                    <h3 className="count col_header">Время жизни</h3>
                    {AdminPanelStore.getCoupons()!=undefined&&AdminPanelStore.getCoupons().map(v=>{
                        return <div className="count" onClick={()=>{
                            setTitle(v.couponTitle)
                            setValue(v.couponValue)
                            setTimeLife(new Date(Number(v.couponTimelife)).getFullYear()+'-'+(String(new Date(Number(v.couponTimelife)).getMonth()).length==1?('0'+new Date(Number(v.couponTimelife)).getMonth()):new Date(Number(v.couponTimelife)).getMonth())+'-'+new Date(Number(v.couponTimelife)).getDate())
                            setView(true)
                        }}>
                             <p>{ new Date(Number(v.couponTimelife)).getDate()}-{ new Date(Number(v.couponTimelife)).getMonth()+1}-{ new Date(Number(v.couponTimelife)).getFullYear()} { new Date(Number(v.couponTimelife)).getHours()}:{ new Date(Number(v.couponTimelife)).getMinutes()}</p>  

                        </div>
                    })}
                </div>
                <div className="col0 col4">
                    <div className="header_redact col_header">
                    <img src={pen} alt="" />
                    </div>
                    {AdminPanelStore.getCoupons()!=undefined&&AdminPanelStore.getCoupons().map(v=>{
                    
                            return  <div className="redact" onClick={()=>{
                                setTitle(v.couponTitle)
                                setValue(v.couponValue)
                                setTimeLife(new Date(Number(v.couponTimelife)).getFullYear()+'-'+(String(new Date(Number(v.couponTimelife)).getMonth()).length==1?('0'+new Date(Number(v.couponTimelife)).getMonth()):new Date(Number(v.couponTimelife)).getMonth())+'-'+new Date(Number(v.couponTimelife)).getDate())
                                setId(v.id)
                                setR(true);
                                }}>
                            <img src={pen} alt="" />
                        </div>
                    })}
                </div>
            </div>
           <Pagination
                actualPage={AdminPanelStore.getCouponsPage()}
                countPages={AdminPanelStore.getCouponsPages()}
                func={ a=>{
                    panel.getCoupons(a,6,null);
                    AdminPanelStore.clearDeletes();
                    setCheck(false)}}
                setPage={a=>AdminPanelStore.setCouponsPage(a)}
            >
            </Pagination>
        </div>
    </div>
    </>
})

export default Coupons