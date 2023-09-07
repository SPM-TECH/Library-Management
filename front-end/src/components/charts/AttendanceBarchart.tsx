import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

import { useQuery } from "react-query";
import { loginCount } from "../../api/admin";
import { Skeleton } from "../../components/ui/skeleton"


const AttendanceBarchart = () => {
  const { data,isLoading } = useQuery("loginCount", loginCount);

  console.log(isLoading)
  return (
<>
   {isLoading ? <div> <SkeletonComp/>
</div>:<ResponsiveContainer height={350}>     
      <BarChart width={500} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" name="date" />
        <YAxis name="count" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>}
  </> 
  );
}


export default AttendanceBarchart;


const SkeletonComp=()=>{
  return(
       
    <div >
    
      <div className="flex flex-row  gap-x-6   items-end m-10  lg:h-[270px]">
        
        <Skeleton className="lg:w-[80px] w-[20px] h-[250px] rounded opacity-25" />
        <Skeleton className="lg:w-[80px] w-[20px] h-[150px] rounded opacity-25" />
        <Skeleton className="lg:w-[80px] w-[20px] h-[250px] rounded opacity-25" />
        <Skeleton className="lg:w-[80px] w-[20px] h-[100px] rounded opacity-25" />
        <Skeleton className="lg:w-[80px] w-[20px] h-[200px] rounded opacity-25" />
        <Skeleton className="lg:w-[80px] w-[20px] h-[200px] rounded opacity-25" />
        <Skeleton className="lg:w-[80px] w-[20px] h-[250px] rounded opacity-25" />

        </div>
        </div>
      

  

  )
}