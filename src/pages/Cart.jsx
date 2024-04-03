import { useEffect, useState } from "react";
import BreadCrumbs from "../components/client/Breadcrumbs";
import Header from "../components/client/Header";
import { config } from "../config.ts";
import { CartUtilite } from "../utilites/cart/cart.ts";
import CartStore from "../stores/CartStore.ts";
import Product from "../components/cart/Product.jsx";
import '../assets/styles/css/cart.css'
import { Reg } from "../utilites/auth/reg.ts";
import Client from "../stores/Client.ts";
const { observer } = require("mobx-react-lite");

const Cart = observer(()=>{
    useEffect(()=>{
        const cart = new CartUtilite()
        cart.getCart()
        cart.countAll()
    },[])
    const [mail,setMail] = useState(false)
    const [del,setDel] = useState(false)
    const [name, setName]= useState("")
    const [sername, setSername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("")
    const [region, setRegion] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [home, setHome] = useState("")
    const [flat, setFlat] = useState("")
    const [otd, setOtd] = useState("")
    const [dMode, setDMode] = useState(null)
    const [payMode, setPayMode] = useState(null)
    return <>
        <Header theme={false}></Header>
        <div className="cart">
        <BreadCrumbs names={['Главная', 'Корзина']} links={[config.mean, config.cart]}></BreadCrumbs>
        <div className="container_c">
            <h3>Ваш заказ</h3>
            <div className="cont">
                {CartStore.getCart().map(v=>{
                    return <Product product={v}></Product>
                })}
            </div>

        </div>
        <div className="summa">
            <span>К оплате:</span>
            <p>{CartStore.getSum()} ₽</p>
        </div>
        <div className="order">
            <h3>Оформление заказа</h3>
            <h4>Персональные данные</h4>
            <span onClick={async()=>{
                const reg = new Reg()
                await reg.checkToken()
                setName(Client.getUser().firstName)
                setSername(Client.getUser().secondName)
                setEmail(Client.getUser().email)
                setPhone(Client.getUser().phone)
            }}>Подставить из профиля</span>
            <div className="info">
                <div className="line">
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Имя"/>
                    <input type="text" value={sername} onChange={(e)=>{setSername(e.target.value)}} placeholder="Фамилия"/>
                </div>
                <div className="line">
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Почта"/>
                    <input type="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder="Телефон"/>
                </div>
            </div>
            <h4>Способ доставки:</h4>
            <div className="delivery">
                <div className="bl">
                    <input type="radio" name="deliv" id="r1" value="null" onChange={()=>{setMail(false); setDel(false); setDMode(null)}}/>
                    <label htmlFor="r1">Самовывоз: Москва, ул. Ленина, д. 9</label>
                </div>
                <div className="bl">
                    <input type="radio" name="deliv" id="r2" value="false" onChange={()=>{setMail(true); setDel(false); setDMode(false)}}/>
                    <label htmlFor="r2" >Почта России</label>
                </div>
                <div className="bl">
                    <input type="radio" name="deliv" id="r3" value="true" onChange={()=>{setMail(false); setDel(true); setDMode(true)}}/>
                    <label htmlFor="r3">Доставка на дом: ТК СДЭК </label>
                </div>
                
            </div>
            {mail&&<>
            <div className="mail">
                <input type="text" placeholder="Город" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
                <input type="text" placeholder="Отделение почты" value={otd} onChange={(e)=>{setOtd(e.target.value)}}/>
            </div>
            </>}
            {del&&<>
            <div className="d_block">
                <span onClick={async()=>{
                    const reg = new Reg()
                    await reg.checkToken()
                    setCountry(Client.getUser().country)
                    setRegion(Client.getUser().region)
                    setCity(Client.getUser().city)
                    setStreet(Client.getUser().street)
                    setHome(Client.getUser().home)
                    setFlat(Client.getUser().flat)
                }}>Подставить из профиля</span>
               <div className="deliv">
                    <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder="Страна"/>
                    <input type="text" value={region} onChange={(e)=>{setRegion(e.target.value)}} placeholder="Область"/>
                    <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}}placeholder="Город"/>
                    <input type="text" value={street} onChange={(e)=>{setStreet(e.target.value)}}placeholder="Улица"/>
                    <input type="text" value={home} onChange={(e)=>{setHome(e.target.value)}} placeholder="Дом"/>
                    <input type="text" value={flat} onChange={(e)=>{setFlat(e.target.value)}}placeholder="Квартира"/>
                </div>
            </div>
         
            </>}
            <div className="payment">
                <h4>Вы можете оплатить покупку одним из ниже перечисленных способов:</h4>
                <div className="pay">
                    <div className="bl">
                        <input type="radio" name="deliv" id="r1" value="null" onChange={()=>{setPayMode(null)}}/>
                        <label htmlFor="r1">Наличными</label>
                    </div>
                    <div className="bl">
                        <input type="radio" name="deliv" id="r2" value="false" onChange={()=>{setPayMode(false)}}/>
                        <label htmlFor="r2">СБП</label>
                    </div>
                    <div className="bl">
                        <input type="radio" name="deliv" id="r3" value="true" onChange={()=>{setPayMode(false)}}/>
                        <label htmlFor="r3">Картой</label>
                    </div>
                </div>
            </div>
            <div className="coupons">
                <h4>Введите скидочный купон</h4>
                <input type="text" placeholder="Купон"/>
            </div>
        </div>
    </div>
    </>
})

export default Cart