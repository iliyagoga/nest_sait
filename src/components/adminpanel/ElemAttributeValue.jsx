import { observer } from "mobx-react-lite";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import del from '../../assets/imgs/Vector (5).svg'
import { useState } from "react";
import RedactModal from "../modals/redactModal.jsx";
import Form from 'react-bootstrap/Form';
import MiniModal from "../modals/modal.jsx";
import ErrorsStore from "../../stores/ErrorsStore.ts";

const ElemAtributeValue=observer(({panel,v})=>{
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
                    await panel.renameAttributeValue(v.id, input);
                    await panel.getAttributesValues(AdminPanelStore.getAttributeId(),AdminPanelStore.getAttrValuePage())
                } catch (error) {
                    setEMode(true)
                    ErrorsStore.setErrorText(error.response.data.message)
                }
               
            }}
        >

        </RedactModal>
                <img src={del} alt="" onDoubleClick={async ()=>{
                    const res = await panel.deleteAttributeValue(v.id);
                    if(res){
                    panel.getAttributesValues(AdminPanelStore.getAttributeId(),0)
                    panel.getCountAttributeValuesPages(AdminPanelStore.getAttributeId())
                    }
                }}/>
                  <h3 onClick={()=>{
                    setCheck(true);
                    setInput(v.attributeValue)
                    }}> {v.attributeValue}</h3>
             
            </div>
})
export default ElemAtributeValue