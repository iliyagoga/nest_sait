import { observer } from "mobx-react-lite";
import srch from "../../assets/imgs/search.svg"
import { useEffect, useState } from "react";
import { Products } from "../../utilites/adminPanel/products.ts";
import CreateProduct from "./CreateProduct.jsx";
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import th from '../../assets/imgs/Vector (4).svg'
import { apiMap } from "../../utilites/apiMap.ts";
import def from '../../assets/imgs/def.png'
import UpdateProduct from "./UpdateProduct.jsx";
import Pagination from "../Pagination.jsx";
const ProductView = observer(()=>{
    const panel = new Products()
    useEffect(()=>{
        AdminPanelStore.setProductPage(0)
        panel.getProducts(0,6, 'null', 'null', AdminPanelStore.getSearch().length>0?AdminPanelStore.getSearch():"null")
        panel.productCountPages(6)
    },[])
    useEffect(()=>{
        panel.getProducts(AdminPanelStore.getProductPage(),6, 'null', 'null', AdminPanelStore.getSearch().length>0?AdminPanelStore.getSearch():"null")
    },[AdminPanelStore.getProductPage()])
    
    const [showAdd, SetShowAdd]= useState(true)
    const [showUpdate, setShowUpdate] = useState(true) 
        return <>
        {(showAdd&&showUpdate)?<>
            <div className="products">
                <div className="block">
                    <div className="header">
                        <h2>Товары</h2>
                        <div className="button" onClick={()=>{SetShowAdd(false)}}>
                            Добавить
                        </div>
                    </div>
                    <div className="body">
                        <div className="search">
                            <img src={srch} alt="" />
                            <input type="text"  value={AdminPanelStore.getSearch()} onChange={(e)=>{
                                AdminPanelStore.setSearch(e.target.value);  
                                if(e.target.value.length!=0){
                                    panel.getProducts(AdminPanelStore.getProductPage(),6, 'null', 'null', e.target.value)
                                }
                                else{
                                    panel.getProducts(AdminPanelStore.getProductPage(),6, 'null', 'null', 'null')
                                }}} placeholder="Введите имя продукта"/>
                        </div>
                        <div className="filters">
                            <div className="fs">
                                <select >
                                    <option value="0">Цена</option>
                                </select>
                                <select >
                                    <option value="0">Дата публикации</option>
                                </select>
                            </div>
                            <div className="pag">
                                <Pagination
                                actualPage={AdminPanelStore.getProductPage()}
                                countPages={AdminPanelStore.getProductCountPages()}
                                func={(a)=>{AdminPanelStore.setProductPage(a)}}
                                setPage={(a)=>{AdminPanelStore.setProductPage(a)}}
                                > 
                                </Pagination>            
                            </div>
                    
                        </div>
                        <div className="table">
                            <div className="col1">
                                <div className="name">
                                    <h4>Название</h4>
                                </div>
                                {AdminPanelStore.getProducts().length>0&&AdminPanelStore.getProducts().map(v=>{
                                    try {
                                        return <div className="bl" onClick={async ()=>{
                                            await panel.getProduct(v.id)
                                            setShowUpdate(false)
                                            AdminPanelStore.setActualProductId(v.id)
                                            
                                            }} >
                                            <img className="thr" src={th} alt="" />
                                            <div className="under">
                                                <div className="img">
                                                    
                                                    <img src={v.previews[0]!=undefined?(apiMap.host+':'+ apiMap.port+'/'+v.previews[0].title):def} alt="" />
                                                </div>
                                                <span>{v.productName}</span>
                                            </div>
                                        
                                        </div>
                                    } catch (error) {
                                        return <div className="bl" onClick={async ()=>{
                                            await panel.getProduct(v.id)
                                            setShowUpdate(false)
                                            AdminPanelStore.setActualProductId(v.id)
                                            
                                            }} >
                                            <img className="thr" src={th} alt="" />
                                            <div className="under">
                                                <div className="img">
                                                    
                                                    <img src={def} alt="" />
                                                </div>
                                                <span>{v.productName}</span>
                                            </div>
                                        
                                        </div>
                                    }
                                   
                                })}
                            </div>
                            <div className="col2">
                                <div className="title">
                                    <h4>Описание</h4>
                                </div>
                                {AdminPanelStore.getProducts().length>0&&AdminPanelStore.getProducts().map(v=>{
                                    return <div className="bl" onClick={async ()=>{
                                        await panel.getProduct(v.id)
                                        setShowUpdate(false)
                                        AdminPanelStore.setActualProductId(v.id)
                                        
                                        }}>
                                        <span>{v.title}</span>
                                    
                                    </div>
                                })}
                            </div>
                            <div className="col3">
                                <div className="price">
                                    <h4>Цена</h4>
                                </div>
                                {AdminPanelStore.getProducts().length>0&&AdminPanelStore.getProducts().map(v=>{
                                    return <div className="bl" onClick={async ()=>{
                                        await panel.getProduct(v.id)
                                        setShowUpdate(false)
                                        AdminPanelStore.setActualProductId(v.id)
                                        
                                        }}>
                                        {v.sale_price==0 && v.price==0 &&<span className="free">free</span>}
                                        {v.sale_price==0 && v.price>0 &&<span className="prc">{v.price} ₽</span>}
                                        {v.sale_price>0 &&<>
                                        <div className="prs">
                                            <p className="prcc">{v.price} ₽</p>
                                            <p className="salePrice">{v.sale_price} ₽</p>
                                        </div>
                                        </>
                                        }
                                       
                                    
                                    </div>
                                })}
                            </div>
                            <div className="col4">
                                <div className="rating">
                                    <h4>Рейтинг</h4>
                                </div>
                                {AdminPanelStore.getProducts().length>0&&AdminPanelStore.getProducts().map(v=>{
                                    return <div className="bl" onClick={async ()=>{
                                        await panel.getProduct(v.id)
                                        setShowUpdate(false)
                                        AdminPanelStore.setActualProductId(v.id)
                                        
                                        }}>
                                        <p>{v.rating}/5</p>
                                        
                                       
                                    
                                    </div>
                                })}
                            </div>
                      
                        </div>
                    </div>
                </div>
            </div>
        </>: (!showAdd?<CreateProduct setShow={()=>{SetShowAdd(true)}}></CreateProduct>:
            !showUpdate&&<UpdateProduct setShow={()=>{setShowUpdate(true)}}></UpdateProduct>
        
        )
    }
    
    </>
   
      

})
export default ProductView