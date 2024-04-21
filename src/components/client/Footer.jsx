import { observer } from "mobx-react-lite";
import '../../assets/styles/css/footer.css'
const Footer = observer(()=>{
    return <>
    <div className="footer">
        <footer>
            <div className="col1">
                <h3>Компания</h3>
                <span>О нас</span>
                <span>Контакты</span>
            </div>
            <div className="col2">
                <h3>Полезное</h3>
                <span>Оплата и доставка</span>
                <span>Условия возврата</span>
                <span>Бонусная система</span>
            </div>
            <div className="col3">
                <h3>Покупателю</h3>
                <span>Избранное</span>
                <span>Публичная офера</span>
                <span>Политика конфиденциальности</span>
            </div>
        </footer>
    </div>
    </>
})

export default Footer