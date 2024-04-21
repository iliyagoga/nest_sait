import { observer } from "mobx-react-lite";
import Header from "../components/client/Header";
import img1 from '../assets/imgs/Yanki (51) 1.png'
import img2 from '../assets/imgs/Yanki (51) 2.png'
import img3 from '../assets/imgs/Yanki (51) 3.png'
import '../assets/styles/css/meanPage.css'
import { useNavigate } from "react-router-dom";
import { config } from "../config.ts";
import Client from "../stores/Client.ts";
import Footer from "../components/client/Footer.jsx";

const MeanPage = observer(()=>{
    const nav= useNavigate()
    return <div className="mean">
        <Header></Header>
        <div className="preview">
            <div className="img1 img">
                <div className="background"></div>
                <img src={img1} alt="" />
            </div>
            <div className="img2 img">
                <div className="background"></div>
                <img src={img2} alt="" />
            </div>
            <div className="img3 img">
                <div className="background"></div>
                <img src={img3} alt="" />
            </div>
            <div className="preview_text">
                <h2>
                    Новая коллекция
                </h2>
                <div className="line"></div>
                <div className="link" onClick={()=>{Client.setOrderFilter('asc');nav(config.catalog); }}>
                    <span>Смотреть новинки</span>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
})

export default MeanPage