import { observer } from "mobx-react-lite";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import del from '../../assets/imgs/Vector (5).svg'
import { useState } from "react";
import RedactModal from "../modals/redactModal.jsx";
import Form from 'react-bootstrap/Form';

const ElemAtributeValue=observer(({panel,v})=>{
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
                await panel.renameAttributeValue(v.id, input);
                await panel.getAttributesValues(AdminPanelStore.getAttributeId(),AdminPanelStore.getAttrValuePage())
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