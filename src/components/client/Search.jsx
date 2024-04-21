import { observer } from "mobx-react-lite";
import '../../assets/styles/css/search.css'
import srch from "../../assets/imgs/search.svg"
import { useNavigate } from "react-router-dom";
import { config } from "../../config.ts";
import { useState } from "react";
import Client from "../../stores/Client.ts";

const Search =  observer(({click})=>{
    const nav = useNavigate()
    const [value, setValue] = useState("")
    return <div className={"searchline "+ (click?"meanclass":"")}>
        <div className="s">
            <img src={srch} alt="" />
            <input type="text" value={value} onChange={(e)=>{setValue(e.target.value)}} onplaceholder="Поиск | Введите $ваш_тег для поиска по тегам или название товара"/>
            <div className="btn" onClick={()=>{
                if(value.length>0){
                    Client.setSearch(value)
                    nav(config.catalog+'/'+value);
                    }
                }}>
                <span>Поиск</span>
            </div>
        </div>
       
    </div>
})

export default Search