// import { observer } from "mobx-react-lite";
// import { CouponUtilite } from "../../utilites/adminPanel/coupons.TS";

// const Coupons=observer(()=>{
//     const panel = new CouponUtilite();
//     useEffect(()=>{
//         AdminPanelStore.setTagPage(0)
//         panel.getCountTags(0);
//         panel.countPages();
//     },[])

//     const [check,setCheck]= useState(false)
//     const [show, setShow] = useState(false);
//     const [mini, setMini] = useState(false)
//     const [r, setR] = useState(false);
//     const [errorText, setErrorText]= useState("");
//     const [actualTag,setActualTag]=useState({});

//     const handleClose = () => setShow(false);
//     const handleClose2 = () => setMini(false);
//     const handleClose3 = () => setR(false);



//     return <>

//     <CreateModal 
//         handleClose={handleClose} 
//         show={show} 
//         body={
//             <Form.Control onChange={e=>{AdminPanelStore.setTagTitle(e.target.value)}}></Form.Control>
//             } 
//         func={async ()=>{
//             try {
//                 await panel.createTag()
//                 AdminPanelStore.setTagTitle("");
//             } catch (error) {
//                 AdminPanelStore.setTagTitle("");
//                 setErrorText(error.response.data.message)
//                 setMini(true)
//             }
//         }} >
//     </CreateModal>

//     <RedactModal 
//         handleClose={handleClose3} 
//         show={r} 
//         body={
//          <Form.Control 
//             value={AdminPanelStore.getTagTitle()}
//             onChange={e=>{AdminPanelStore.setTagTitle(e.target.value)}}>
//         </Form.Control>
//         } 
//         func={async ()=>{   
//             await panel.redactTag(actualTag);
//             AdminPanelStore.setTagTitle("");
//         }}> 
//     </RedactModal>

//     <MiniModal 
//         handleClose={handleClose2} 
//         show={mini} 
//         text={errorText}>
//     </MiniModal>

//     <div className="tagVIew">
//         <div className="container">
//             <div className="container_header">
//                 <span onClick={async ()=>{ await panel.getCountTags(AdminPanelStore.getTagPage());}}>Все теги</span>
//                 <span onClick={()=>{setShow(true); }}>Добавить</span>
//                 <span className="r" onClick={
//                     async()=>{
//                         await panel.removetag();
//                         AdminPanelStore.clearDeletes();
//                         setCheck(false)
//                         }
//                     }>Удалить</span>
//             </div>
//             <div className="container_table">
//                 <div className="col0 col1">
//                     <div className="remove col_header">
//                             <div className={"checkbox "} onClick={()=>{
//                                 setCheck(!check)
//                                 if(!check)
//                                     AdminPanelStore.setAllDeletes()
//                                 else
//                                     AdminPanelStore.clearDeletes()
//                                 }}>
//                                 <div className={"bhh "+ (check&&'checkbox_active')}></div>
//                             </div>
//                     </div>
        
//                     {AdminPanelStore.getTags()!=undefined&&AdminPanelStore.getTags().map((v,i)=>{
//                         return <div className="rem">
//                                     <div className={"checkbox "} onClick={()=>{
//                                         AdminPanelStore.setDeletes(i,v.id)
//                                     }
//                                         }>
//                                         <div className={"bhh "+ (AdminPanelStore.getDelete(i).mode&&'checkbox_active')}></div>
//                                     </div>
//                                 </div>
//                     })}
//                 </div>
//                 <div className="col0 col2">
//                     <h3 className="name col_header" >Название</h3>
//                     {AdminPanelStore.getTags()!=undefined&&AdminPanelStore.getTags().map(v=>{
//                         return <div className="title">
//                             <p> {v.tagTitle} </p>
//                         </div>
//                     })}
//                 </div>
//                 <div className="col0 col3">
//                     <h3 className="count col_header">Количество привязок</h3>
//                     {AdminPanelStore.getTags()!=undefined&&AdminPanelStore.getTags().map(v=>{
//                         return <div className="count">
//                             <p>{v.countTag || 0}</p>
//                         </div>
//                     })}
//                 </div>
//                 <div className="col0 col4">
//                     <div className="header_redact col_header">
//                     <img src={pen} alt="" />
//                     </div>
//                     {AdminPanelStore.getTags()!=undefined&&AdminPanelStore.getTags().map(v=>{
//                             return  <div className="redact" onClick={()=>{
//                                 AdminPanelStore.setTagTitle(v.tagTitle);
//                                 setActualTag(v);
//                                 setR(true);
//                                 }}>
//                             <img src={pen} alt="" />
//                         </div>
//                     })}
//                 </div>
//             </div>
//            <Pagination 
//                 actualPage={AdminPanelStore.getTagPage()}
//                 countPages={AdminPanelStore.getCountTagPages()}
//                 func={ a=>{
//                     panel.getCountTags(a);
//                     AdminPanelStore.clearDeletes();
//                     setCheck(false)}}
//                 setPage={a=>AdminPanelStore.setTagPage(a)}
//             >
//             </Pagination>
//         </div>
//     </div>
//     </>
// })

// export default Coupons