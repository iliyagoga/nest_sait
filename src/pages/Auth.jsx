import { Link, useNavigate } from 'react-router-dom'
import '../assets/styles/css/login.css'
import { config } from '../config.ts'
import { observer } from "mobx-react-lite";
import  AuthStore  from '../stores/AuthStore.ts';
import { Reg } from '../utilites/auth/reg.ts';
import { useState } from 'react';
import Modal from '../components/modals/modal.jsx';
import MiniModal from '../components/modals/modal.jsx';
import ErrorsStore from '../stores/ErrorsStore.ts';
const Login = observer(({mode})=>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 =()=>{setModalError(false)}
    const [modalError, setModalError] = useState(false)
    const [text,setText] =useState("");
    const [classEmail, setClassEmail] =useState("");
    const [classNick, setClassNick] =useState("");
    const [classPass, setClassPass] =useState("");
    const [classRePass, setClassRePass] =useState("");
    const [errorEmail, setErrorEmail] =useState("");
    const [errorNick, setErrorNick] =useState("");
    const [errorPass, setErrorPass] =useState("");
    const nav= useNavigate();

    const regUtil= new Reg(AuthStore.getNick(), AuthStore.getEmail(), AuthStore.getPass(), AuthStore.getRePass())

    return <div className="login">
        <MiniModal
        handleCLose={handleClose2}
        show={modalError}
        text={ErrorsStore.getErrorText()}
        header={"Уведомление"}
        >

        </MiniModal>
        <Modal handleClose={handleClose} show={show} text={text}></Modal>
        <div className='block'>
        {!mode ? (<>
        <h2>Войти</h2>
        <div>
            <span>Нет аккаунта?</span>
            <Link to={config.reg}>Зарегистрируйтесь</Link>
        </div>
        </>): (<>
            <h2>Регистрация</h2>
        <div>
            <span>Есть аккаунт?</span>
            <Link to={config.login}>Войти</Link>
        </div>
        </>)
        
        }

        <div className={'input nickname '+classNick}>
            <input type="text" value={AuthStore.getNick()} onChange={(e)=>{
                setClassNick("");
                setErrorNick("");
                AuthStore.setNick(e.target.value)}}placeholder='Имя пользователя' />
            <p className={classNick}>{errorNick}</p>

        </div>

         {
            mode &&
            <div className={"input email "+ classEmail}>
            <input type="email" value={AuthStore.getEmail()} onChange={(e)=>{
                setClassEmail("");
                setErrorEmail("");
                AuthStore.setEmail(e.target.value)}} placeholder='Почта'/>
                <p className={classEmail}>{errorEmail}</p>
            </div>
      
        }
       
        <div className={'input pass '+ classPass}>
            <input type="password" value={AuthStore.getPass()} onChange={(e)=>{
                setClassPass("");
                setErrorPass("");
                AuthStore.setPass(e.target.value)}}placeholder='Пароль' />
                <p className={classPass}>{errorPass}</p>
        </div>
        {
            mode &&  
            <div className={'input pass '+ classRePass}>
                <input type="password" value={AuthStore.getRePass()} onChange={(e)=>{
                    setClassRePass("");
                    AuthStore.setRePass(e.target.value)}}placeholder='Повтор пароля' />
            </div>
        }
        <div className='button' onClick={async ()=>{
            if(mode){
                try {
                   await regUtil.registration()
                   nav(config.mean)
                } catch (error) {
                    if(error["atten"]==undefined){
                        
                        if(error.message!=undefined && error.response==undefined){
                            handleShow();
                            setText(error.message)

                        }
                        else{
                            if(error.response.data.message!=undefined){
                                handleShow();
                                setText(error.response.data.message)
                            }
                            if(error.response.data.messages!=undefined){
                                for(let el of error.response.data.messages){
                                    if(el.type=="email"){
                                        setClassEmail('attention')
                                        setErrorEmail(el.value[0])
                                    }
                                    if(el.type=="nickname"){
                                        setClassNick('attention')
                                        setErrorNick(el.value[0])
                                    }
                                    if(el.type=="password"){
                                        setClassPass('attention')
                                        setClassRePass('attention')
                                        setErrorPass(el.value[0])
                                    }
                                }
                                }
                            }
                    }
                    else{
                        for(let el of error.atten){
                            if(el.type=="email"){
                                setClassEmail('attention')
                            }
                            if(el.type=="nick"){
                                setClassNick('attention')
                            }
                            if(el.type=="pass"){
                                setClassPass('attention')
                            }
                            if(el.type=="repass"){
                                setClassRePass('attention')
                            }
                            handleShow();
                            setText("Заполните необходимые поля")
                        }
                    }

                }
            }
              
            else
            try {
                await regUtil.login()
                nav(config.mean)
            } catch (error) {
                if(error.response.data.message!=undefined){
                    handleShow();
                    setText(error.response.data.message)
                }
            }
                
        }}>
            Продолжить
        </div>
        </div>
        
    </div>
})
export default Login