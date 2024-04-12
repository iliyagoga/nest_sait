import { observer } from "mobx-react-lite";
import TagsView from "./TagsView";
import AttributeView from "./AttributeView";
import CategoryView from "./CategoryView";
import ProductView from "./ProductView";
import Coupons from "./Coupons";
import OrdersViews from "./OrdersViews";


const Workspace = observer(({m})=>{
    switch (m) {
        
        case 1:
            return (<>
                <ProductView></ProductView>
                </>)

        case 2:
            return (<>
              <div className='workspace'>
                <CategoryView></CategoryView>
                </div></>)

        case 3:
            return (<>
              <div className='workspace'>
                <AttributeView></AttributeView>
                </div></>)
        case 4:
            return (<>
            <div className='workspace'>
                <TagsView></TagsView>
            </div>
            </>)
        case 5:
            return (<>
            <div className='workspace'>
                <OrdersViews></OrdersViews>
            </div>
            </>)
        case 6:
            return (<>
            <div className='workspace'>
                <Coupons></Coupons>
            </div>
            </>)
    
        default:
            break;
    }
})
export default Workspace