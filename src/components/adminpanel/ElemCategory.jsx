import { observer } from "mobx-react-lite";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import del from '../../assets/imgs/Vector (5).svg'
import { useState } from "react";
import RedactModal from "../modals/redactModal.jsx";
import Form from 'react-bootstrap/Form';

const ElemCategory=observer(({panel,v})=>{
    const [input, setInput]= useState("")
    const [check, setCheck]= useState(false)
    return <div className="elem">
        <RedactModal 
            handleClose={()=>{setCheck(false)}}
            show={check}
            body={
                <Form.Control
                    value={input}
                    onChange={(e)=>{setInput(e.target.value)}}
                >

                </Form.Control>
            }
            func={async ()=>{
                await panel.renameCategory(v.id, input);
                await panel.getCategoriesByGroup(AdminPanelStore.getGroupId(),AdminPanelStore.getCategoryPage())
            }}
        >

        </RedactModal>
                <img src={del} alt="" onDoubleClick={async ()=>{
                    const res = await panel.removeCategory(v.id);
                    if(res){
                    await panel.getCategoriesByGroup(AdminPanelStore.getGroupId(),AdminPanelStore.getCategoryPage())
                    await panel.getCategoriesCountPages(AdminPanelStore.getGroupId())
                    }
                }}/>
                  <h3 onClick={()=>{
                    setCheck(true);
                    setInput(v.categoryName)
                    }}> {v.categoryName}</h3>
             
            </div>
})
export default ElemCategory