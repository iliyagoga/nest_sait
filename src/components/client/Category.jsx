import { observer } from "mobx-react-lite";
import { useState } from "react";
import Client from "../../stores/Client.ts";
import CatalogUtilite from "../../utilites/client/catalog.ts";

const Category = observer(({title,categories})=>{
    const [mode, setMode] =useState(false)
    const catalog = new CatalogUtilite()
    return <div className="ul">
    <span className={mode?'active':''} onClick={()=>{
        setMode(!mode)
    }}>{title.groupTitle}</span>
    <ul  className={mode?'activeUl':''}>
        {categories.map(v=>{
            return  <li  onClick={()=>{
                if(Client.getCategory()!=undefined){
                    if(Client.getCategory().idCat==v.id){
                        Client.clearCategory()
                    }
                    else{
                        Client.setCategory(title.id, v.id)
                        catalog.getProductsCats(title.id, v.id, Client.getPriceFilter(), Client.getRatingFilter(), Client.getOrderFilter(), 12, 0)

                    }
                }
                else{
                    Client.setCategory(title.id, v.id)
                    catalog.getProductsCats(title.id, v.id, Client.getPriceFilter(), Client.getRatingFilter(), Client.getOrderFilter(), 12, 0)
                }
                
            }}>{v.categoryName}</li>
        })}
    </ul>
    
</div>
})

export default Category