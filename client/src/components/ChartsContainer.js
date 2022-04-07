
import React, { useState } from "react"
import Wrapper from "../assets/wrappers/ChartsContainer"
import { useAppContext } from "../context/appContext"
import BarChart from './BarChart'
import AreaChart from './AreaChart'



 const ChartsContainer = () => {
    const [barChart, setBarChart] = useState(true)
    const {monthlyApplications: data} = useAppContext()

   return (
     <Wrapper>
         <h4>monthly Applications</h4>
         <button type="button" onClick={()=>setBarChart(!barChart)}>
             {barChart ? 'Area Chart': 'Bar Chart'}
         </button>
         {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
     </Wrapper>
         
     
    
   )
 }
 export default ChartsContainer