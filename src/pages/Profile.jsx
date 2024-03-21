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
import Client from "../stores/Client.ts";
import { apiMap } from "../utilites/apiMap.ts";
const { observer } = require("mobx-react-lite");


const Profile = observer(()=>{
    const [modeM, setModeM]= useState(null)
    const {decodedToken, isExpired} = useJwt(localStorage.getItem('token'))
    const [ser, setSer]=useState("")
    const [num, setNum] = useState("")
    const [mode, setMode]=useState(false)
    const [clk, setClk]=useState(false)
    const nav = useNavigate()


    const [name, setName]= useState("")
    const [sername, setSername] = useState("")
    const [fathername, setFathername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("")
    const [region, setRegion] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [home, setHome] = useState("")
    const [flat, setFlat] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarFile,setAvatarFile] =useState(null)

    const reg = new Reg()
    useEffect(()=>{
        reg.checkToken().then(e=>{
            setModeM(e)
            setName(Client.getUser().firstName)
            setSername(Client.getUser().secondName)
            setFathername(Client.getUser().fatherName)
            setEmail(Client.getUser().email)
            setPhone(Client.getUser().phone)
            if(Client.getUser().avatar)
            setAvatar(apiMap.host+':'+apiMap.port+'/'+Client.getUser().avatar)
            else
            setAvatar(null)
            setCountry(Client.getUser().country)
            setRegion(Client.getUser().region)
            setCity(Client.getUser().city)
            setStreet(Client.getUser().street)
            setHome(Client.getUser().home)
            setFlat(Client.getUser().flat)
            if(decodedToken&&(decodedToken.role!=undefined&&decodedToken.role[0].role=='ADMIN')){
                setSer(Client.getUser().passportSeria)
                setNum(Client.getUser().passportNumber)
            }
          
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
                    <input type="file" onChange={(e)=>{
                        setAvatar(URL.createObjectURL(e.target.files[0]))
                        setAvatarFile(e.target.files[0])
                    }} name="" id="" />
                    <img src= {avatar?(avatar):def} alt="" />
                </div>
                
                
            </div>:
            <div className="menu" onMouseOver={()=>{setClk(true)}} onMouseOut={()=>{setClk(false)}}>
                    <div className="del">
                        <p className="d" onClick={()=>{
                            setClk(false)
                            setAvatar(null)
                            setAvatarFile(null)
                        }}>Удалить</p>
                        <p className="back" onClick={()=>{setClk(false)}}>Отмена</p>
                    </div>
                </div> 
            }
                    
                   
        
            </div>
            <h3>Персональные данные:</h3>
            <div className="line l1">
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Имя"/>
                <input type="text" value={sername} onChange={(e)=>{setSername(e.target.value)}} placeholder="Фамилия"/>
                <input type="text" value={fathername} onChange={(e)=>{setFathername(e.target.value)}} placeholder="Отчество"/>
            </div>
            <div className="line l2">
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Почта"/>
                <input type="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder="Телефон"/>
            </div>
            <h3>Данные доставки:</h3>
            <div className="line l3">
                <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder="Страна"/>
                <input type="text" value={region} onChange={(e)=>{setRegion(e.target.value)}} placeholder="Область"/>
                <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}}placeholder="Город"/>
                <input type="text" value={street} onChange={(e)=>{setStreet(e.target.value)}}placeholder="Улица"/>
                <input type="text" value={home} onChange={(e)=>{setHome(e.target.value)}} placeholder="Дом"/>
                <input type="text" value={flat} onChange={(e)=>{setFlat(e.target.value)}}placeholder="Квартира"/>
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
        <div className="meanbtn" onClick={()=>{
            reg.updateUser(name,sername,fathername,email,phone,country,region,city,street,home,flat,avatarFile,avatar)
        }}>
            Обновить данные
        </div>
        </>
        : modeM==false&&nav(config.login)}
    </div>
})


export default Profile