import { observer } from "mobx-react-lite";
import { useState } from "react";
import { AdminsUtilite } from "../../utilites/adminPanel/admins.ts";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import MiniModal from "../modals/modal.jsx";
import DeleteModal from "../modals/deleteModal.jsx";
import ErrorsStore from "../../stores/ErrorsStore.ts";

const Admins = observer(()=>{
    const panel = new AdminsUtilite()
    const [modal,setModal] = useState(false)
    const [modal2,setModal2] = useState(false)
    const [e,setE] = useState(false)
    const [eMode, setEMode] = useState(false)
    const [search, setSearch] = useState("")
    useState(()=>{
        panel.getAdmins().then().catch(e=>{setEMode(true);ErrorsStore.setErrorText(e.response.data.message)})
    },[])

    return <>
      <MiniModal
            header={"Уведомление"}
            handleClose={()=>{setEMode(false)}}
            show={eMode}
            text={ErrorsStore.getErrorText()}
        ></MiniModal>
        <DeleteModal
            handleClose={()=>{setE(false)}}
            show={e}
            he={'Удаление'}
            body={
                'Удалить?'
            }
            func={async ()=>{
                try {
                    await panel.deleteAdmin(AdminPanelStore.getAdmin().email)
                    setModal(false)
                } catch (error) {
                    ErrorsStore.setErrorText(error.response.data.message)
                    setEMode(true)
                    setE(false)
                   
                }
            }}
            >

        </DeleteModal>
        <MiniModal
            header={AdminPanelStore.getAdmin()!=undefined&& AdminPanelStore.getAdmin().nickname}
            show={modal}
            handleClose={()=>{setModal(false)}}
            text={
                AdminPanelStore.getAdmin()!=undefined&& <div className="adminModal">
                    <span>{AdminPanelStore.getAdmin().nickname}</span>
                    <span>{AdminPanelStore.getAdmin().firstName || 'Имя'}</span>
                    <span>{AdminPanelStore.getAdmin().secondtName || 'Фамилия'}</span>
                    <span>{AdminPanelStore.getAdmin().fatherName || 'Отчество'}</span>
                    <span>{AdminPanelStore.getAdmin().email || 'Почта' }</span>
                    <span>{AdminPanelStore.getAdmin().phone || 'Телефон'}</span>
                    <span>{AdminPanelStore.getAdmin().passportSeria?(AdminPanelStore.getAdmin().passportSeria+'/'+AdminPanelStore.getAdmin().passportNumber ):"Паспорт"}</span>
                    <div className="button" onClick={()=>{setE(true)}}>
                        Снять с должности администратора
                    </div>
                </div>
                
                
            }
        >

        </MiniModal>
        <MiniModal
            header={AdminPanelStore.getAdmin()!=undefined&& AdminPanelStore.getAdmin().nickname}
            show={modal2}
            handleClose={()=>{setModal2(false)}}
            text={
                AdminPanelStore.getAdmin()!=undefined&& <div className="adminModal">
                    <span>{AdminPanelStore.getAdmin().nickname}</span>
                    <span>{AdminPanelStore.getAdmin().firstName || 'Имя'}</span>
                    <span>{AdminPanelStore.getAdmin().secondtName || 'Фамилия'}</span>
                    <span>{AdminPanelStore.getAdmin().fatherName || 'Отчество'}</span>
                    <span>{AdminPanelStore.getAdmin().email || 'Почта' }</span>
                    <span>{AdminPanelStore.getAdmin().phone || 'Телефон'}</span>
                    <span>{AdminPanelStore.getAdmin().passportSeria?(AdminPanelStore.getAdmin().passportSeria+'/'+AdminPanelStore.getAdmin().passportNumber ):"Паспорт"}</span>
                    <div className="button" onClick={async()=>{await panel.createAdmin(AdminPanelStore.getAdmin().email);setEMode(true); ErrorsStore.setErrorText(AdminPanelStore.getAdmin().nickname+' теперь администратор')}}>
                        Поставить на должность администратора
                    </div>
                </div>
                
                
            }
        >

        </MiniModal>
        <div className="adminsView">
            <div className="container">
                <div className="container_header">
                    <span>Все администраторы</span>
                </div>
                <div className="container_table">
                    <div className="col0 col1">
                        <div className="col_header">
                            <h3>ФИО</h3>
                        </div>
                        {AdminPanelStore.getAdmins()!=undefined&&AdminPanelStore.getAdmins().map(v=>{
                            return <span onClick={()=>{AdminPanelStore.setAdmin(v);setModal(true)}}>
                                {v.nickname}
                            </span>
                        })}
                    </div>
                    <div className="col0 col2">
                    <div className="col_header">
                            <h3>Почта</h3>
                        </div>
                        {AdminPanelStore.getAdmins()!=undefined&&AdminPanelStore.getAdmins().map(v=>{
                            return <span onClick={()=>{AdminPanelStore.setAdmin(v);setModal(true)}}>
                                {v.email}
                            </span>
                        })}
                    </div>
                </div>
                <div className="create">
                    <h3>Поиск пользователя</h3>
                    <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    <div className="search" onClick={async ()=>{
                        try {
                            await panel.getAdmin(search)
                            setModal2(true)
                        } catch (error) {
                            setEMode(true)
                            ErrorsStore.setErrorText(error.message)
                        }
                      
                    }}>Поиск</div>
                </div>
            </div>
        </div>
    </>
})
export default Admins