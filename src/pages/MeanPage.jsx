import { observer } from "mobx-react-lite";
import Header from "../components/client/Header";
import img1 from '../assets/imgs/Yanki (51) 1.png'
import img2 from '../assets/imgs/Yanki (51) 2.png'
import img3 from '../assets/imgs/Yanki (51) 3.png'
import '../assets/styles/css/meanPage.css'
const MeanPage = observer(()=>{
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
                <div className="link">
                    <span>Смотреть новинки</span>
                </div>
            </div>

        </div>
    </div>
})

export default MeanPage