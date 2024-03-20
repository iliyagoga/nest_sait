import Header from "../components/client/Header";
import "../assets/styles/css/profile.css"
import BreadCrumbs from "../components/client/Breadcrumbs";
import { config } from "../config.ts";
import def from '../assets/imgs/def.png'
import { useJwt } from "react-jwt";
import info from '../assets/imgs/Vector.svg'
import { useEffect, useState } from "react";
import { Reg } from "../utilites/auth/reg.ts";
import { useNavigate } from "react-router-dom";
const { observer } = require("mobx-react-lite");


const Profile = observer(()=>{
    const [modeM, setModeM]= useState(null)
    const {decodedToken, isExpired} = useJwt(localStorage.getItem('token'))
    const [ser, setSer]=useState("")
    const [num, setNum] = useState("")
    const [mode, setMode]=useState(false)
    const [clk, setClk]=useState(false)
    const nav = useNavigate()
    useEffect(()=>{
        const reg = new Reg()
        reg.checkToken().then(e=>{
            setModeM(e)
        })
    },[])
    
return <div className="profile">
    {modeM==true?<>
        <Header theme={false}></Header>
        <BreadCrumbs names={['Главная','Личный кабинет']} links={[config.mean,config.profile]}></BreadCrumbs>
        <div className="btns">
            <div className="btn">Личные данные</div>
            <div className="btn" onClick={()=>{localStorage.removeItem('token'); nav(config.mean)}}>Выйти</div>
        </div>
        <div className="personal">
            <div className="avatar">
            {!clk?<div className="i" onMouseOver={()=>{setMode(true)}} onMouseOut={()=>{setMode(false)}} onClick={()=>{
                }}>
                {mode&& <img src={info} className="info" alt="" onClick={()=>{setClk(!clk)}} />
            
                }
                <div className="img">
                    <input type="file" name="" id="" />
                    <img src= {def} alt="" />
                </div>
                
                
            </div>:
            <div className="menu" onMouseOver={()=>{setClk(true)}} onMouseOut={()=>{setClk(false)}}>
                    <div className="del">
                        <p className="d" onClick={()=>{
                            setClk(false)
                        }}>Удалить</p>
                        <p className="back" onClick={()=>{setClk(false)}}>Отмена</p>
                    </div>
                </div> 
            }
                    
                   
        
            </div>
            <h3>Персональные данные:</h3>
            <div className="line l1">
                <input type="text" placeholder="Имя"/>
                <input type="text" placeholder="Фамилия"/>
                <input type="text"  placeholder="Отчество"/>
            </div>
            <div className="line l2">
                <input type="email" placeholder="Почта"/>
                <input type="phone" placeholder="Телефон"/>
            </div>
            <h3>Данные доставки:</h3>
            <div className="line l3">
                <input type="text" placeholder="Страна"/>
                <input type="text" placeholder="Область"/>
                <input type="text" placeholder="Город"/>
                <input type="text" placeholder="Улица"/>
                <input type="text" placeholder="Дом"/>
                <input type="text" placeholder="Квартира"/>
            </div>
            {(decodedToken&&(decodedToken.role!=undefined&&decodedToken.role[0].role=='ADMIN'))&&<>
            <h3>Паспортные данные: </h3>
            <div className="line l4">
                <input type="text" value={ser} onChange={(e)=>{
                    const y= Number.isInteger(Number(e.target.value))
                    if(y){
                        setSer(e.target.value)
                    }
               }}placeholder="Серия"/>
                <input type="text" value={num} onChange={(e)=>{
                    const y= Number.isInteger(Number(e.target.value))
                    if(y){
                        setNum(e.target.value)
                    }
               }} placeholder="Номер"/>
            </div>

            </>}
        </div>
        <div className="meanbtn">
            Обновить данные
        </div>
        </>
        : modeM==false&&nav(config.login)}
    </div>
})


export default Profile