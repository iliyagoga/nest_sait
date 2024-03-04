import { observer } from "mobx-react-lite";
import tr from '../assets/imgs/Vector (2).svg'
import tl from '../assets/imgs/Vector (3).svg'
import '../assets/styles/css/pagin.css'
const Pagination = observer(({actualPage, countPages, func, setPage})=>{
    const a= Object.assign(actualPage);
   return  <div className="pagin">
    <span className="n">Номер страницы: </span>
    <select name="" value={actualPage} onChange={e=>{ 
        setPage(Number(e.target.value));
        func(Number(e.target.value));
        }}id="">
        {[...Array(countPages)].map((v,i)=>{
            return <option  value={i}>{i+1}</option>
        })}
    </select>
    <span className="pages">{actualPage*6+1}-{(actualPage+1)*6}</span>
    <div className="throws">
        <span onClick={()=>{
            if(actualPage>0) 
            {   
                func(a-1);
                setPage(a-1);
               
            }
            }}>
            <img src={tl} alt="" />
        </span>
        <span onClick={()=>{ 
            if( actualPage+1<countPages){
                func(a+1);
                setPage(a+1);
              
            }
               
            }}>
            <img src={tr} alt="" />
        </span>
    </div>
</div>
})

export default Pagination