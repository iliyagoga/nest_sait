import { observer } from "mobx-react-lite";
import up from '../../assets/imgs/up.svg'
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { useEffect, useState } from "react";
import { Products } from "../../utilites/adminPanel/products.ts";
import MiniModal from "../modals/modal.jsx";
import del from '../../assets/imgs/Vector (5).svg'
import back from '../../assets/imgs/Vector (6).svg'
import info from '../../assets/imgs/Vector.svg'
import PhotoCreateItem from "./PhotoCreateItem.jsx";
import MiddleModal from "../modals/middleModal.jsx";

const CreateProduct = observer(({setShow})=>{
    const panel = new Products();
    const reader= new FileReader()
    const [fileImg, setFileImg]= useState("")
    useState(()=>{
        AdminPanelStore.setName("")
        AdminPanelStore.setTitle("")
        AdminPanelStore.setDescr("")
        AdminPanelStore.setImgFile(null)
    },[])
    useEffect(()=>{
     

        if(AdminPanelStore.getImgFile()!=undefined){
            setFileImg(URL.createObjectURL(AdminPanelStore.getImgFile()))
        }  
       
    },[AdminPanelStore.getImgFile()])



    const [showGroups, setShowGroups]= useState(false)
    const [showCategory, setShowCategory]= useState(false)
    const [showTags, setShowTags] = useState(false)
    const [showAttrs, setShowAttrs]= useState(false)
    const [showAttrsValue, setShowAttrsValue]= useState(false)
    const [move, setMove]= useState(false) 
    const [redo, setRedo]= useState(false)
    const [showImages, setShowImages] = useState(false)
    const [trigMModal, setTrigMModal]= useState(false)
    const [actualGroup, setActualGroup] = useState(null)
    const [actualAttr, setActualAttr] = useState(null)
    const [actualAttrId, setActualAttrId] = useState(null)


    const deleteFunction =  (copy,values,i)=>{
        if(copy.length==1){
            copy=[]
            values=[]
        }
        if(i==0){
            copy=[...copy.slice(1)]
            values=[...values.slice(1)]
        }else{
            if(i=copy.length-1){
               copy= [...copy.slice(0,i)]
               values= [...values.slice(0,i)]
            }
            else{
                copy= [...copy.slice(0,i), ...copy.slice(i)]
                values=[...values.slice(0,i), ...values.slice(i)]
            }
        
        }
        return {copy,values}
    }
    return <div className="createProduct">

        <MiniModal show={showGroups}
        handleClose={()=>{setShowGroups(false)}}
        header={"Группы"}
        text={<div className="modalGroupsBody">
            {
                AdminPanelStore.getProductGroups()!=undefined&&AdminPanelStore.getProductGroups().map((v)=>{
                    return <span onClick={async ()=>{
                        await panel.getCategoies(0,v.id, 100000)
                        setShowGroups(false)
                        setShowCategory(true)
                        setActualGroup(v.groupTitle)
                    }}>{v.groupTitle}</span>
                })
            }
        </div>
            }>
        
        </MiniModal>

        
        <MiniModal show={showCategory}
        handleClose={()=>{setShowCategory(false)}}
        header={"Категории"}
        text={<div className="modalGroupsBody">
            {
                AdminPanelStore.getProductCategories()!=undefined&&AdminPanelStore.getProductCategories().map((v)=>{
                    return <span  onClick={ ()=>{
                        setShowCategory(false)
                        if(AdminPanelStore.getActualCategories().length==0){
                            AdminPanelStore.addActualCategories(v.id)
                            AdminPanelStore.addGroupCategories(actualGroup, v.categoryName)
                        }
                        let c=true
                        for(let y of AdminPanelStore.getActualCategories()){
                            if(y==v.id){
                                c=false
                            }
                        }
                        if(c){
                            AdminPanelStore.addActualCategories(v.id)
                            AdminPanelStore.addGroupCategories(actualGroup, v.categoryName)
                        }
                      
                        setActualGroup(null)
                    }}>{v.categoryName}</span>
                })
            }
        </div>
            }>
        
        </MiniModal>

        <MiniModal show={showTags}
        handleClose={()=>{setShowTags(false)}}
        header={"Теги"}
        text={
            <div className="modalTagsBody">
            {
                AdminPanelStore.getProductsTags()!=undefined&&AdminPanelStore.getProductsTags().map((v)=>{
                    return <span onClick={async ()=>{
                        setShowTags(false)
                        if(AdminPanelStore.getActualTags().length>0){
                            let c=true
                            for(let y of AdminPanelStore.getActualTags()){
                                if(y==v.tagTitle){
                                    c=false
                                }
                            }
                            if(c){
                                AdminPanelStore.addActualTags(v.tagTitle)
                                AdminPanelStore.addActualTagsIds(v.id)
                            }
                        }
                        else{
                            AdminPanelStore.addActualTags(v.tagTitle)
                            AdminPanelStore.addActualTagsIds(v.id)
                        }
                       
                    }}>#{v.tagTitle}</span>
                })
            }
        </div>
        }
        >

        </MiniModal>

        <MiniModal show={showAttrs}
        handleClose={()=>{setShowAttrs(false)}}
        header={"Атрибуты"}
        text={<div className="modalGroupsBody">
            {
                AdminPanelStore.getProductsAttrs()!=undefined&&AdminPanelStore.getProductsAttrs().map((v)=>{
                    return <span onClick={async ()=>{
                        await panel.getAttributesValuesLimit(v.id, 0, 10000)
                        setShowAttrs(false)
                        setShowAttrsValue(true)
                        setActualAttr(v.attributeName)
                        setActualAttrId(v.id)
                    }}>{v.attributeName}</span>
                })
            }
        </div>
            }>
        
        </MiniModal>

        
        <MiniModal show={showAttrsValue}
        handleClose={()=>{setShowAttrsValue(false)}}
        header={"Значение атрибута"}
        text={<div className="modalGroupsBody">
            {
                AdminPanelStore.getProductsAttrsValues()!=undefined&&AdminPanelStore.getProductsAttrsValues().map((v)=>{
                    return <span className={AdminPanelStore.findActualAttrValuesIds(actualAttrId, v.id)? 'active': ''} onClick={ ()=>{
                            AdminPanelStore.setActualAttrValuesIds(actualAttrId, v.id,actualAttr, v.attributeValue)
                    }}>{v.attributeValue}</span>
                })
            }
        </div>
            }>
        
        </MiniModal>
        <MiddleModal
        handleClose={setShowImages}
        show={showImages}
        he={"Галерея"}
        body={
            <div className="gals">
                <div className="head">
                    <h4 onClick={()=>{setTrigMModal(false)}} className={!trigMModal?'active':''}>Фотографии товара</h4>
                </div>
               {!trigMModal&& <div className="body def">
                    <div className="photos">                 
                        {(AdminPanelStore.getGallery()).map((v,i)=>{
                           return  <PhotoCreateItem v={v}></PhotoCreateItem>
                          
                        })}
                    </div>
                    <div className="bar">
                        <div className="upload">
                            <input type="file" onChange={(e)=>{
                                if(e.target.files[0]['name'].split('.')[1]=="jpg" ||
                                e.target.files[0]['name'].split('.')[1]=="png" ||
                                e.target.files[0]['name'].split('.')[1]=="webp" ||
                                e.target.files[0]['name'].split('.')[1]=="PNG" ||
                                e.target.files[0]['name'].split('.')[1]=="svg" 
                                ){
                                    AdminPanelStore.addFileGallery(URL.createObjectURL(e.target.files[0]))
                                    AdminPanelStore.setCreateGallery(URL.createObjectURL(e.target.files[0]),e.target.files[0])
                                }
                                
                            }}/>
                            <img src={up} alt="" />
                        </div>
                    </div>
                </div>}
            </div>
        }
        >

        </MiddleModal>
        
        <div className="back" onClick={()=>setShow()}>
            <img src={back} alt="" />
            <p>Товары</p>
        </div>

        <h2>Создание товара</h2>

        <div className="basicInfo">
            <div className="l">
                <h3>Начальная информация</h3>
                {fileImg.length>0&&  <div className="img" onMouseOut={()=>{setMove(false); }} onMouseOver={()=>{setMove(true)}}>
                    {move&&<div className="info" onClick={()=>{
                        setRedo(true)
                    }}>
                        <img src={info} alt="" />
                    </div>}
                    {redo?<>
                            <div className="del">
                                <p className="d" onClick={()=>{
                                    AdminPanelStore.setImgFile(undefined);
                                    setFileImg([])
                                    setRedo(false)
                                }}>Удалить</p>
                                <p className="backC" onClick={()=>{setRedo(false)}}>Отмена</p>
                            </div>
                    </>:<>
                        <input type="file" onChange={(e)=>{
                            AdminPanelStore.setImgFile(e.target.files[0])
                        }}/>
                    <img src={fileImg} alt="" />
                    </>}
                    </div>}
                {fileImg.length==0&&  <div className="block">
                    <input type="file" onChange={(e)=>{
                        AdminPanelStore.setImgFile(e.target.files[0])
                    }}/>
                    
                      
                    <div className="i">
                        <img src={up} alt="" />
                        <div className="in">
                            <h4>Изображение товара</h4>
                            <p>Загрузите основное изображение товара (SVG, JPG, PNG, GIF, WEBP, SVG)</p>
                        </div>
                        
                    </div>
                </div>}
            </div>
            <div className="r">

                <div className="y">
                    <label htmlFor="name">Имя продукта</label>
                    <input type="text" value={AdminPanelStore.getName()} onChange={(e)=>{AdminPanelStore.setName(e.target.value)}}  id="name" placeholder="Имя продукта" />
                </div>

                <div className="y">
                    <label htmlFor="shortDesc">Короткое описание продукта</label>
                    <textarea id="shortDesc" value={AdminPanelStore.getTitle()} onChange={(e)=>{AdminPanelStore.setTitle(e.target.value)}}  placeholder="Короткое описание продукта"></textarea>
                </div>

                <div className="y">
                    <label htmlFor="desc">Описание продукта</label>
                    <textarea id="desc" value={AdminPanelStore.getDescr()} onChange={(e)=>{AdminPanelStore.setDescr(e.target.value)}} rows="10" placeholder="Описание продукта"></textarea>
                </div>
            </div>
        </div>

        <div className="attributes">
            <div className="l">
                <h3>Атрибуты</h3>
                <p>Характеристики товара</p>
            </div>
            <div className="r">
                <div className="button" onClick={async ()=>{
                    await panel.getAttributes(0,10000)
                    setShowAttrs(true)
                    }}>
                    Добавить
                </div>
                {AdminPanelStore.getAttrAttrsValues().length>0&&<>
                <div className="block">
                    {AdminPanelStore.getAttrAttrsValues().map((v,i)=>{
                        return <div className="atrs">
                            <h4>{v.aV}: </h4>
                            {v.avVs.map((y,j)=>{
                                return <span onClick={()=>{
                                    AdminPanelStore.setActualAttrValuesIds(AdminPanelStore.getActualAttrValuesIds()[i].aVid,AdminPanelStore.getActualAttrValuesIds()[i].avVIds[j])
                                }}>{y}{(v.avVs.length-1)>j&&','}</span>
                            })}
                        </div>
                    })}
                </div>
                </>
                }
                
               
            </div>
        </div>

        <div className="gallery">
            <div className="l">
                <h3>Галерея</h3>
                <p>Изображения для товара</p>
                <span>(Нажмите на картинку, чтобы удалить)</span>
            </div>
            <div className="r">

             {!showImages&&   <div className="block" onClick={()=>{setShowImages(true)}}>
                    <div className="under" >
                        <img src={up} alt="" />
                        <div className="u">
                            <h4>Загрузите c компьютера или перетащите файлы</h4>
                            <p>(SVG, JPG, PNG, GIF, WEBP, SVG)</p>
                        </div>
                    </div>
                </div>
            
            }
              
            </div>
        </div>

        <div className="price">
            <div className="l">
                <h3>Цена</h3>
                <p>Установите цену продукта</p>
            </div>
            <div className="r">
                <div className="y">
                    <label htmlFor="old">Обычная цена</label>
                    <input type="text"  id="old" value={AdminPanelStore.getOldPrice()} onChange={(e)=>{
                         try {
                            const res= Number(e.target.value)
                            AdminPanelStore.setOldPrice(res)

                         } catch (error) {
                            
                         }
                        }}  placeholder="Цена" />
                </div>

                <div className="y">
                    <label htmlFor="new">Акционная цена</label>
                    <input id="new" value={AdminPanelStore.getNewPrice()} onChange={(e)=>{
                         try {
                            const res= Number(e.target.value)
                            AdminPanelStore.setNewPrice(res)

                         } catch (error) {
                            
                         }
                        }} placeholder="Акционная цена"/>
                </div>
            </div>
        </div>
        <div className="category">
            <div className="l">
                <h3>Категории</h3>
                <p>Категории товара</p>
            </div>
            <div className="r">
            {AdminPanelStore.getGroupCategories().length>0&&<>
                <div className="values">
                    <div className="row1">
                        {AdminPanelStore.getGroupCategories()!=undefined&&AdminPanelStore.getGroupCategories().map((v,i)=>{
                            return <div className="underrow">
                                    <img src={del} alt="" onClick={()=>{
                                        let {copy,values}=deleteFunction(AdminPanelStore.getActualCategories(),AdminPanelStore.getGroupCategories(),i)

                                        AdminPanelStore.setActualCategories(copy)
                                        AdminPanelStore.setGroupCategories(values)

                                        
                                    }}/>
                                    <h4 className="gr">{v.gV}</h4>
                                </div>
                        })}
                    </div>
                    <div className="row2">
                        {AdminPanelStore.getGroupCategories()!=undefined&&AdminPanelStore.getGroupCategories().map(v=>{
                            return <span className="cv">{v.cV}</span>
                        })}
                    </div>
                </div>
                </>
                }
             
                <div className="button" onClick={async ()=>{
                    await panel.getGroups(0,100000)
                    setShowGroups(true)
                    }}>
                    Добавить
                </div>
              

            </div>
        </div>
        <div className="tags">
            <div className="l">
                <h3>Теги</h3>
                <p>Теги продукта</p>
            </div>
            <div className="r">
                <div className="field">
                    {AdminPanelStore.getActualTags().map((v,i)=>{
                        return <div className="r">
                            <img src={del} alt="" onClick={()=>{
                                let {copy,values} = deleteFunction(AdminPanelStore.getActualTagsIds(), AdminPanelStore.getActualTags(),i)

                                AdminPanelStore.setActualTagsIds(copy)
                                AdminPanelStore.setActualTags(values)
                            }} />
                            <span>#{v}</span>
                            </div>
                    })}
                </div>
                <div className="button" onClick={async ()=>{
                    await panel.getTags()
                    setShowTags(true)
                    }}>
                    Добавить
                </div>
            </div>
        </div>
        <div className="create"  onClick={async ()=>{
            await panel.createProduct()
        }}>
            <span>Готово</span>
        </div>
    </div>

})
export default CreateProduct