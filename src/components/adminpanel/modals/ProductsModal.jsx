import { observer } from "mobx-react-lite";
import MiddleModal from "../../modals/middleModal";
import AdminPanelStore from "../../../stores/AdminPanelStore.ts";
import Pagination from "../../Pagination.jsx";
import def from '../../../assets/imgs/def.png'
import srch from "../../../assets/imgs/search.svg"
import { Products } from "../../../utilites/adminPanel/products.ts";
import { apiMap } from "../../../utilites/apiMap.ts";
const ProductsModal = observer(({show,setShow})=>{
    const panel = new Products()
    return <MiddleModal
    handleClose={()=>{setShow(false)}}
    show={show}
    he={"Товары"}
    body={
    <div className="productsRec">
            <div className="body">
                <div className="search">
                    <img src={srch} alt="" />
                    <input type="text"  value={AdminPanelStore.getSearch()} onChange={(e)=>{
                        AdminPanelStore.setSearch(e.target.value);  
                        if(e.target.value.length!=0){
                            panel.getProducts(AdminPanelStore.getProductPage(),6, 'null', 'null', e.target.value)
                            panel.productCountPages(6, 'null', 'null', AdminPanelStore.getSearch().length>0?AdminPanelStore.getSearch():"null")
                        }
                        else{
                            panel.getProducts(AdminPanelStore.getProductPage(),6, 'null', 'null', 'null')
                            panel.productCountPages(6, 'null', 'null', AdminPanelStore.getSearch().length>0?AdminPanelStore.getSearch():"null")
                        }}} placeholder="Введите имя продукта"/>
                </div>
                <div className="filters">
                    {AdminPanelStore.getSearch().length==0&&<div className="fs">
                        <div className="fPrice">
                        <h4>Цена:</h4>
                        <select onChange={(e)=>{
                            AdminPanelStore.setFilterPrice(e.target.value)
                            panel.getProducts(AdminPanelStore.getProductPage(),6, AdminPanelStore.getFilterPrice(), AdminPanelStore.getFilterDate(),  AdminPanelStore.getSearch().length>0?AdminPanelStore.getSearch():"null")
                            panel.productCountPages(6, AdminPanelStore.getFilterPrice(), AdminPanelStore.getFilterDate(), AdminPanelStore.getSearch().length>0?AdminPanelStore.getSearch():"null")
                            }}>
                            <option value="null">Нет</option>
                            <option value="asc">По возрастранию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                        </div>
                        {/* <div className="fRating">
                            <h4>Рейтинг:</h4>
                            <select onChange={(e)=>{
                                AdminPanelStore.setFilterDate(e.target.value)
                                panel.getProducts(AdminPanelStore.getProductPage(),6, AdminPanelStore.getFilterPrice(), AdminPanelStore.getFilterDate(),  AdminPanelStore.getSearch().length>0?AdminPanelStore.getSearch():"null")
                                panel.productCountPages(6, AdminPanelStore.getFilterPrice(), AdminPanelStore.getFilterDate(), AdminPanelStore.getSearch().length>0?AdminPanelStore.getSearch():"null")
                                }}>
                                <option value="null">Нет</option>
                                <option value="asc">По возрастранию</option>
                                <option value="desc">По убыванию</option>
                            </select>
                        </div> */}
                        
                    </div>
                    }
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
                            return <div className="bl" onClick={ ()=>{
                                    AdminPanelStore.setProductsRec(v.id, v.productName, v.previews[0]!=undefined?(v.previews[0].title):undefined)
                                
                                }} >
                                <div className={AdminPanelStore.findProductsRec(v.id)?' under active': 'under'}>
                                    <div className="img">
                                        
                                        <img src={v.previews[0]!=undefined?(apiMap.host+':'+ apiMap.port+'/'+v.previews[0].title):def} alt="" />
                                    </div>
                                    <span>{v.productName}</span>
                                </div>
                            
                            </div>
                            
                        })}
                    </div>
                
                </div>
            </div>
        </div>
    }
    ></MiddleModal>
})

export default ProductsModal