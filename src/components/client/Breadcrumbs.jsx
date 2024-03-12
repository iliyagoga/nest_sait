import { observer } from "mobx-react-lite";
import thr from '../../assets/imgs/b_thr.svg'
import { useNavigate, useParams } from "react-router-dom";
import '../../assets/styles/css/breadcrumbs.css'
const BreadCrumbs = observer(({names, links})=>{
    const nav = useNavigate()
    const value  = window.location.pathname
    return <div className="breadcrumbs">
        {names.map((v,i)=>{
            return <>
            <span className={value==(links[i])?'activeLink': ''} onClick={()=>{nav(links[i])}}>
                {v}
            </span>
            {i+1!=names.length&&<img src={thr}/>}
            </>
        })}
    </div>
})

export default BreadCrumbs