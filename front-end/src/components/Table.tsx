import { useQuery } from "react-query";
import { getAttendance } from "../api/admin";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "./ui/button";
import { toExcel } from "to-excel";
import { TablePagination } from "./TablePagination";

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
          <Button onClick={() => handleClick(data)} className="w-52">
            Click to download Report{" "}
          </Button>
          {data && <TablePagination data={data} />}
        </div>
      )}
    </>
  );
}

const SkeletonComp = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-8 p-4  ">
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] lg:w-[500px] rounded opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded  lg:w-[600px] opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded lg:w-[600px] opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded lg:w-[600px] opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded lg:w-[600px] opacity-25" />
        <Skeleton className="lg:h-[40px] h-[30px] w-[400px] rounded lg:w-[600px] opacity-25" />
        <Skeleton className="lg:h-[40px] -[30px] w-[400px] rounded lg:w-[600px] opacity-25" />
      </div>
    </div>
  );
};
