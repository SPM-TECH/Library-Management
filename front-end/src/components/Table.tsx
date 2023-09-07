import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { useQuery } from "react-query";
import { getAttendance } from "../api/admin";
import { format } from "date-fns";
import { Skeleton } from "../components/ui/skeleton"

export function TableDemo() {
  const { data,isLoading } = useQuery("attendance", getAttendance);

  return (
    <> 
   { isLoading ? <SkeletonComp/>: <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">UserId</TableHead>
          <TableHead className="">Name</TableHead>
          <TableHead className="">Faculty</TableHead>
          <TableHead className="text-right ">Time In</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((user) => (
            <TableRow key={user.index_number}>
              <TableCell className="font-medium text-white">
                {user.index_number}
              </TableCell>
              <TableCell className="font-medium text-white">
                {user.user_name}
              </TableCell>
              <TableCell className="font-medium text-white">
                {user.faculty}
              </TableCell>
              <TableCell className="text-right text-white">
                {format(new Date(user.updated_at), "h:mm a")}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>}
    </>
  );
}


const SkeletonComp=()=>{
  return(
       
    <div >
    
      <div className="flex flex-col lg:gap-y-10 items-end m-10  ">
        
        <Skeleton className="lg:h-[20px] h-[10px] w-[850px] rounded opacity-25" />
        <Skeleton className="lg:h-[20px] h-[10px] w-[850px] rounded opacity-25" />
        <Skeleton className="lg:h-[20px] h-[10px] w-[850px] rounded opacity-25" />
        <Skeleton className="lg:h-[20px] h-[10px] w-[850px] rounded opacity-25" />
        <Skeleton className="lg:h-[20px] h-[10px] w-[850px] rounded opacity-25" />
        <Skeleton className="lg:h-[20px] h-[10px] w-[850px] rounded opacity-25" />
        <Skeleton className="lg:h-[20px] -[10px] w-[850px] rounded opacity-25" />

        </div>
        </div>
      

  

  )
}