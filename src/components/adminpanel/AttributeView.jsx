import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Attributes } from "../../utilites/adminPanel/attributes.ts";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import Pagination from "../Pagination";
import pen from'../../assets/imgs/Frame (3).svg'
import th from '../../assets/imgs/Vector (4).svg'
import MiniModal from "../modals/modal.jsx";
import Form from 'react-bootstrap/Form';
import CreateModal from "../modals/createCustom.jsx";
import ElemAtributeValue from "./ElemAttributeValue.jsx";
import RedactModal from "../modals/redactModal.jsx";
import DeleteModal from "../modals/deleteModal.jsx";
import ErrorsStore from "../../stores/ErrorsStore.ts";

const AttributeView = observer(()=>{
    const panel = new Attributes();
    useEffect(()=>{
        panel.countPages();
        panel.getAttributes();
    },[])

  
    const [show, setShow] = useState(false);
    const [mini, setMini] = useState(false)
    const [rA, setRA] = useState(false);
    const [remAll, setRemAll]= useState(false);

    const [ca, setCa] = useState(false);
    const [renameAttr, setRenameAttr] = useState("");
    const [renameAttrId, setRenameAttrId] = useState(null);
    const getAttributeValues= async (id, page)=>{
        await panel.getAttributesValues(id,page)
    }
    const handleClose = () => setShow(false);
    const handleClose2 = () => setMini(false);
    const handleCloseCreateAttr = () => setCa(false);
    const handleCloseRenameAttr = () => setRA(false)

    const [eMode, setEMode] = useState(false)
    const handleClose3 = ()=>{setEMode(false)}

    const [dA, setDA] =useState(false)
    const handleClose4 = ()=>{setDA(false)}

    return <div className="attributeView">
        <MiniModal
            header={"Уведомление"}
            handleClose={handleClose3}
            show={eMode}
            text={ErrorsStore.getErrorText()}
        ></MiniModal>
        <DeleteModal
            handleClose={handleClose4}
            show={dA}
            he={'Удаление'}
            body={
                'Удалить?'
            }
            func={async ()=>{
                try {
                    await panel.deleteAttributes();
                    AdminPanelStore.clearDeleteAttrs();
                    setRemAll(false)
                } catch (error) {
                    ErrorsStore.setErrorText(error.response.data.message)
                    setEMode(true)
                    setDA(false)
                }
                
               
            
            }}
            >

            </DeleteModal>
        <CreateModal handleClose={handleClose2} show={mini} body={<>
            <Form.Control as='textarea' onChange={(e)=>{
                AdminPanelStore.setCreateAttrValue(e.target.value);
            }}> 

            </Form.Control>
            </>
                    }
            func={async ()=>{
                try {
                    await panel.createAttributeValue(AdminPanelStore.getAttributeId(),AdminPanelStore.getCreateAttrValue());
                    getAttributeValues(AdminPanelStore.getAttributeId(),0);
                    await panel.getCountAttributeValuesPages(AdminPanelStore.getAttributeId())
                    AdminPanelStore.setAttrValuePage(0)
                } catch (error) {
                    setEMode(true)
                    ErrorsStore.setErrorText(error.response.data.message)
                }
               
            }
        
            }
            he={"Создать значение"}
        
        ></CreateModal>
        <MiniModal handleClose={handleClose} show={show} text={ 
            <div className="adminPanelAttrsValues">
                <div className="header">
                    <h3>Название</h3>
                </div>
                {AdminPanelStore.getAttrsValues()!=undefined&&((AdminPanelStore.getAttrsValues()).map(v=>{
                    return  <ElemAtributeValue panel={panel} v={v}></ElemAtributeValue>
                    
                }))}

                <div className="button" onClick={()=>{
                    setMini(!mini)
                }}>Добавить</div>
                <Pagination 
                    actualPage={AdminPanelStore.getAttrValuePage()}
                    countPages={AdminPanelStore.getAttrValueCountPages()}
                    func={ a=>{
                        panel.getAttributesValues(AdminPanelStore.getAttributeId(), a);
                        panel.getCountAttributeValuesPages(AdminPanelStore.getAttributeId())
                    }
                    }
                    setPage={a=>AdminPanelStore.setAttrValuePage(a)}
                >
                </Pagination>
            </div>

        }></MiniModal>


        <CreateModal handleClose={handleCloseCreateAttr} show={ca} body={<>
                <Form.Control  onChange={(e)=>{
                    AdminPanelStore.setCreateAttr(e.target.value);
                }}> 

                </Form.Control>
             </>
                    }
            func={async ()=>{
                try {
                    await panel.createAttribute(AdminPanelStore.getCreateAttr());
                    panel.getAttributes(0)
                } catch (error) {
                    setEMode(true)
                    ErrorsStore.setErrorText(error.response.data.message)
                }
              
            }
        
            }
            he={"Создать атрибут"}
        
        ></CreateModal>

        <RedactModal 
            handleClose={handleCloseRenameAttr}
            show={rA}
            body={
                <Form.Control
                    value={renameAttr}
                    onChange={(e)=>{setRenameAttr(e.target.value)}}
                >

                </Form.Control>
            }
            func={async ()=>{
                try {
                    await panel.renameAttribute(renameAttrId, renameAttr);
                    await panel.getAttributes(0)
                } catch (error) {
                    setEMode(true)
                    ErrorsStore.setErrorText(error.response.data.message)
                }
              
            }}
                >

        </RedactModal>

        
        <div className="container">

            <div className="container_header">
                <span onClick={async ()=>{ await panel.getAttributes(AdminPanelStore.getTagPage());}}>Все атрибуты</span>
                <span onClick={()=>{setCa(true); }}>Добавить</span>
                { <span className="r" onClick={
                    async()=>{
                       setDA(true)
                        }
                    }>Удалить</span> }
            </div>
            <div className="container_table">
                <div className="col0 col2">
                    <h3 className="name col_header" >Название</h3>
                    {AdminPanelStore.getAttrs()!=undefined&&AdminPanelStore.getAttrs().map(v=>{
                      
                      
                        return <div className="title" onClick={async ()=>{
                            getAttributeValues(v.id, 0)
                            AdminPanelStore.setAttributeId(v.id);
                            panel.getCountAttributeValuesPages(AdminPanelStore.getAttributeId());
                            setShow(!show)
                            }}>
                            <img src={th} alt="" />
                            <p> {v.attributeName} </p>
                        </div>
                    })}
                </div>
                <div className="col0 col4">
                    <div className="header_redact col_header">
                        <h3>Переименовать</h3>
                    </div>
                    {AdminPanelStore.getAttrs()!=undefined&&AdminPanelStore.getAttrs().map(v=>{
                            return  <div className="redact" onClick={()=>{
                                setRenameAttr(v.attributeName);
                                setRA(true);
                                setRenameAttrId(v.id);
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
                                    AdminPanelStore.setAllDeleteAttrs()
                                else
                                    AdminPanelStore.clearDeleteAttrs()
                                }}
                                >
                                <div className={"bhh "+ (remAll&&'checkbox_active')}></div>
                            </div>
                    </div>
        
                    {AdminPanelStore.getAttrs()!=undefined&&AdminPanelStore.getAttrs().map((v,i)=>{
                        return <div className="rem">
                                    <div className={"checkbox "} 
                                    onClick={()=>{
                                        AdminPanelStore.setDeleteAttrs(i,v.id)
                                    }
                                        }
                                        >
                                        <div className={"bhh "+ (AdminPanelStore.getDeleteAttr(i).mode&&'checkbox_active')}></div>
                                    </div>
                                </div>
                    })}
                </div>
            </div>
           <Pagination 
                actualPage={AdminPanelStore.getAttrPage()}
                countPages={AdminPanelStore.getCountAttrsPages()}
                func={ a=>{
                    panel.getAttributes(a);}}
                setPage={a=>AdminPanelStore.setAttrPage(a)}
            >
            </Pagination>
        </div>
    </div>
})

export default AttributeView