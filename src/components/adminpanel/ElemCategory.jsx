import { observer } from "mobx-react-lite";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import del from '../../assets/imgs/Vector (5).svg'
import { useState } from "react";
import RedactModal from "../modals/redactModal.jsx";
import Form from 'react-bootstrap/Form';
import ErrorsStore from "../../stores/ErrorsStore.ts";
import MiniModal from "../modals/modal.jsx";

const ElemCategory=observer(({panel,v})=>{
    const [input, setInput]= useState("")
    const [check, setCheck]= useState(false)
    const [eMode, setEMode] = useState(false)
    const handleClose = ()=>{setEMode(false)}
    
    return <div className="elem">

        
        <MiniModal
            header={"Уведомление"}
            handleClose={handleClose}
            show={eMode}
            text={ErrorsStore.getErrorText()}
        ></MiniModal>
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
                try {
                    await panel.renameCategory(v.id, input);
                    await panel.getCategoriesByGroup(AdminPanelStore.getGroupId(),AdminPanelStore.getCategoryPage())
                } catch (error) {
                    ErrorsStore.setErrorText(error.response.data.message)
                    setEMode(true)
                }
               
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