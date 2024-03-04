import { observer } from "mobx-react-lite";
import { Categories } from "../../utilites/adminPanel/categories.ts";
import { useEffect, useState } from "react";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import CreateModal from "../modals/createCustom.jsx";
import Form from 'react-bootstrap/Form';
import Pagination from "../Pagination";
import pen from'../../assets/imgs/Frame (3).svg'
import th from '../../assets/imgs/Vector (4).svg'
import MiniModal from "../modals/modal.jsx";
import RedactModal from "../modals/redactModal.jsx";
import ElemCategory from "./ElemCategory.jsx";


const CategoryView = observer(()=>{
    const panel = new Categories();
    useEffect(()=>{
        panel.getGroupsCountPages();
        panel.getGroups(0);
    },[])
    const [show, setShow] = useState(false);
    const [createCatMode, setCreateCatMode] = useState(false)
    const [renameGroup, setRenameGroup] = useState(false);
    const [remAll, setRemAll]= useState(false);
    const [createGroupMode, setCreateGroupMode] = useState(false);

    return <div className="categoryView">

        <CreateModal handleClose={()=>{setCreateCatMode(false)}} show={createCatMode} body={<>
            <Form.Control as='textarea' onChange={(e)=>{
                AdminPanelStore.setCreateCategory(e.target.value);
            }}> 

            </Form.Control>
        </>
                }
        func={async ()=>{
            await panel.createCategory(AdminPanelStore.getGroupId(),AdminPanelStore.getCreateCategory());
            await panel.getCategoriesByGroup(AdminPanelStore.getGroupId(),0);
            await panel.getCategoriesCountPages(AdminPanelStore.getGroupId())
            AdminPanelStore.setCategoryPage(0)
        }
      
        }
        he={"Создать значение"}
        
        ></CreateModal>
        
        <MiniModal handleClose={()=>setShow(false)} show={show} text={ 
            <div className="adminPanelAttrsValues">
                <div className="header">
                    <h3>Название</h3>
                </div>
                {AdminPanelStore.getCategories()!=undefined&&((AdminPanelStore.getCategories()).map(v=>{
                    return  <ElemCategory panel={panel} v={v}></ElemCategory>
                    
                }))}

                <div className="button" onClick={()=>{
                    setCreateCatMode(!createCatMode)
                }}>Добавить</div>
                <Pagination 
                    actualPage={AdminPanelStore.getCategoryPage()}
                    countPages={AdminPanelStore.getCategoriesCountPages()}
                    func={ a=>{
                        panel.getCategoriesByGroup(AdminPanelStore.getGroupId(), a);
                        panel.getCategoriesCountPages(AdminPanelStore.getGroupId())
                    }
                    }
                    setPage={a=>AdminPanelStore.setCategoryPage(a)}
                >
                </Pagination>
            </div>

        }></MiniModal> 


        <CreateModal handleClose={()=>{setCreateGroupMode(false)}} show={createGroupMode} body={<>
                <Form.Control  onChange={(e)=>{
                    AdminPanelStore.setCreateGroup(e.target.value);
                }}> 

                </Form.Control>
             </>
                    }
            func={async ()=>{
                await panel.createGroup(AdminPanelStore.getCreateGroup());
                panel.getGroups(0)
            }
        
            }
            he={"Создать группу"}
        
        ></CreateModal>

        <RedactModal 
            handleClose={()=>{setRenameGroup(false)}}
            show={renameGroup}
            body={
                <Form.Control
                    value={AdminPanelStore.renameGroup}
                    onChange={(e)=>{AdminPanelStore.setRenameGroup(e.target.value)}}
                >

                </Form.Control>
            }
            func={async ()=>{
                await panel.renameGroup();
                await panel.getGroups(0)
            }}
            >

        </RedactModal>

        
        <div className="container">

            <div className="container_header">
                <span onClick={async ()=>{ await panel.getGroups(AdminPanelStore.getGroupPage());}}>Все группы</span>
                <span onClick={()=>{setCreateGroupMode(true); }}>Добавить</span>
                { <span className="r" onClick={
                    async()=>{
                        await panel.removeGroup();
                        AdminPanelStore.clearDeletesGroup();
                        setRemAll(false)
                        }
                    }>Удалить</span> }
            </div>
            <div className="container_table">
                <div className="col0 col2">
                    <h3 className="name col_header" >Название</h3>
                    {AdminPanelStore.getGroups()!=undefined&&AdminPanelStore.getGroups().map(v=>{
                      
                      
                        return <div className="title" onClick={async ()=>{
                            AdminPanelStore.setGroupId(v.id);
                            AdminPanelStore.setCategoryPage(0);
                            await panel.getCategoriesByGroup(v.id,0);
                            await panel.getCategoriesCountPages(v.id);
                           
                            setShow(!show)
                            }}>
                            <img src={th} alt="" />
                            <p> {v.groupTitle} </p>
                        </div>
                    })}
                </div>
                <div className="col0 col4">
                    <div className="header_redact col_header">
                        <h3>Переименовать</h3>
                    </div>
                    {AdminPanelStore.getGroups()!=undefined&&AdminPanelStore.getGroups().map(v=>{
                            return  <div className="redact" onClick={()=>{
                                AdminPanelStore.setRenameGroup(v.attributeName);
                                setRenameGroup(true);
                                AdminPanelStore.setRenameGroupId(v.id);
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
                                    AdminPanelStore.setAllDeletesGroup()
                                else
                                    AdminPanelStore.clearDeletesGroup()
                                }}
                                >
                                <div className={"bhh "+ (remAll&&'checkbox_active')}></div>
                            </div>
                    </div>
        
                    {AdminPanelStore.getGroups()!=undefined&&AdminPanelStore.getGroups().map((v,i)=>{
                        return <div className="rem">
                                    <div className={"checkbox "} 
                                    onClick={()=>{
                                        AdminPanelStore.setDeletesGroup(i,v.id)
                                    }
                                        }
                                        >
                                        <div className={"bhh "+ (AdminPanelStore.getDeleteGroup(i).mode&&'checkbox_active')}></div>
                                    </div>
                                </div>
                    })}
                </div>
            </div>
           <Pagination 
                actualPage={AdminPanelStore.getGroupPage()}
                countPages={AdminPanelStore.getGroupsCountPages()}
                func={ a=>{
                    panel.getGroups(a);}}
                setPage={a=>AdminPanelStore.setGroupPage(a)}
            >
            </Pagination>
        </div>
    </div>
})

export default CategoryView