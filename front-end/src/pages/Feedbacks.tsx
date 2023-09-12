import Layout from '@/components/Layout'
import { useQuery } from 'react-query'
import { getFeedbacks } from '@/api/feedback' 
import { Skeleton } from "../components/ui/skeleton";
import { format } from "date-fns";


export default function Feedbacks() {
  const {data,isLoading}=useQuery('feedback',getFeedbacks)

    console.log(data);
  return (
    <Layout>
{isLoading ? <SkeletonComp/>: <div className='flex flex-col'>
<h1 className="text-white text-2xl m-5 font-bold">Feedbacks</h1>
  <div className='p-9 grid grid-cols-2 gap-3'>

 {data && data.map((feedback)=>(
  <div className='bg-slate-800 rounded-xl flex flex-col gap-4 shadow-md shadow-slate-900 items-center justify-around p-5'>
    
    <p className='text-white'>" {feedback.content} "</p>
    <p className='text-slate-600'> {format(new Date(feedback.created_at),'yyyy-mm-dd')} </p>
     </div>

 ))}

</div> 
</div> }
    </Layout>
  )
}



const SkeletonComp = () => {
  return (
    <div>
      <div className=" lg:gap-10 gap-10 items-end m-10 p-10 grid grid-cols-2 ">
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full  rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
      </div>
    </div>
  );
};
