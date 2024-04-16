import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { observer } from 'mobx-react-lite';
import AnalitycsStore from '../../stores/AnalitycsStore.ts';




const LineEl = observer(()=>{
    if(AnalitycsStore.getOrders()!=undefined){
        const sets = {
            labels: AnalitycsStore.getOrders()['labels'],
            datasets: [{
                data: AnalitycsStore.getOrders()['values'],
                label: 'Заказы',
                borderColor: "#3333ff",
                
        }]
            
        }
        ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale );
        return <Chart type='line' width={50} height={20} data={sets} />
    
    }
    return <></>
   
  
})

export default LineEl