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
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "./ui/button";
import { toExcel } from "to-excel";

export function TableDemo() {
  const { data, isLoading } = useQuery("attendance", getAttendance);

  const headers = [
    { label: "ID", field: "id" },
    { label: "User name", field: "user_name" },
    { label: "NIC", field: "nic_number" },
    { label: "Index Number", field: "index_number" },
    { label: "Faculty", field: "faculty" },
    { label: "Created", field: "created_at" },
    { label: "updated_at", field: "updated_at" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (data: any) => {
    toExcel.exportXLS(headers, data, "filename");

  };

  return (
    <>
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <div className="w-full flex flex-col">
          <Button onClick={() => handleClick(data)} className="w-52" >
            Click to download Report{" "}
          </Button>
          <Table>
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
          </Table>
        </div>
      )}
    </>
  );
}

const SkeletonComp = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-6   ">
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] lg:w-[500px] rounded opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded  lg:w-[500px] opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded lg:w-[500px] opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded lg:w-[500px] opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded lg:w-[500px] opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded lg:w-[500px] opacity-25" />
        <Skeleton className="lg:h-[40px] -[30px] w-[400px] rounded lg:w-[500px] opacity-25" />
      </div>
    </div>
  );
};
