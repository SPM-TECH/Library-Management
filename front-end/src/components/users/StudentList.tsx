import { getUsers, User } from "@/api/users";
import { useQuery } from "react-query";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TablePagination from "./TablePagination";

const DataLoader = () => (
  <div className="h-[250px] flex items-center justify-center">
    <Loader2 className="animate-spin w-16 h-16" />
  </div>
);

const StudentTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="text-white">Name</TableHead>
      <TableHead className="text-white">Faculty</TableHead>
      <TableHead className="text-white">NIC No</TableHead>
      <TableHead className="text-white">Index No</TableHead>
    </TableRow>
  </TableHeader>
);

const StudentRow = (user: User) => (
  <TableRow key={user.id}>
    <TableCell className="text-slate-300">{user.user_name}</TableCell>
    <TableCell className="text-slate-300">{user.faculty}</TableCell>
    <TableCell className="text-slate-300">{user.nic_number}</TableCell>
    <TableCell className="text-slate-300">{user.index_number}</TableCell>
  </TableRow>
);

const StudentList = () => {
  const { data, isLoading } = useQuery(["student_list"], () => getUsers());

  return (
    <div className="h-full w-full">
      <h3 className="my-4 font-semibold text-2xl underline underline-offset-2 text-white">
        List of students
      </h3>

      <div>
        {isLoading ? (
          <DataLoader />
        ) : (
          data && (
            <Table>
              <StudentTableHeader />
              <TableBody>
                {data.map((user) => (
                  <StudentRow key={user.id} {...user} />
                ))}
              </TableBody>
              <TablePagination total={data.length} />
            </Table>
          )
        )}
      </div>
    </div>
  );
};

export default StudentList;
