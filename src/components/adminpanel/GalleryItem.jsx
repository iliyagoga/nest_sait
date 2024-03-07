import { observer } from "mobx-react-lite";
import { useState } from "react";
import info from '../../assets/imgs/Vector.svg'
import AdminPanelStore from "../../stores/AdminPanelStore.ts";

const PhotoItem=observer(({v})=>{
    const [mode, setMode]=useState(false)
    const [clk, setClk]=useState(false)
    return <>
      {!clk?<div className="i" onMouseOver={()=>{setMode(true)}} onMouseOut={()=>{setMode(false)}} onClick={()=>{
        }}>
         {mode&& <img src={info} className="info" alt="" onClick={()=>{setClk(!clk)}} />
      
        }
         <div className="img">
            <img src={v}/>
        </div>
         
        
    </div>:
    <div className="menu" onMouseOver={()=>{setClk(true)}} onMouseOut={()=>{setClk(false)}}>
            <div className="del">
                <p className="d" onClick={()=>{
                    AdminPanelStore.deleteUploadImages(v);
                    AdminPanelStore.deleteUploadGallery(v)
                    setClk(false)
                }}>Удалить</p>
                <p className="back" onClick={()=>{setClk(false)}}>Отмена</p>
            </div>
        </div> 
    }
    </>
   
})
export default PhotoItem