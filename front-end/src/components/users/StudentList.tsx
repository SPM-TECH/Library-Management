import { getUsers, User } from "@/api/users";
import { useQuery } from "react-query";
import { Loader2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TablePagination from "./TablePagination";
import { useState } from "react";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/GlobalContext";

const DataLoader = () => (
  <div className="h-[250px] flex items-center justify-center">
    <Loader2 className="animate-spin w-16 h-16" />
  </div>
);

const StudentTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Category</TableHead>
      <TableHead>NIC No</TableHead>
      <TableHead>Registration No</TableHead>
    </TableRow>
  </TableHeader>
);

const StudentRow = ({
  user,
  onDelete,
}: {
  user: User;
  onDelete: () => void;
}) => {
  return (
    <TableRow key={user.id}>
      <TableCell className="">{user.user_name}</TableCell>
      <TableCell className=" ">{user.faculty}</TableCell>
      <TableCell className=" ">{user.nic_number}</TableCell>
      <TableCell className="">{user.index_number}</TableCell>
      <TableCell>
        <Button variant="ghost" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

const StudentList = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(10);

  const { setDeleteModalOpen, setDeleteId } = useGlobalContext();

  const onDelete = (id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const { data, isLoading } = useQuery(["student_list"], () => getUsers());

  return (
    <div className="h-full w-full">
      <h3 className="my-4 font-semibold text-2xl underline underline-offset-2 ">
        List of users
      </h3>

      <div>
        {isLoading ? (
          <DataLoader />
        ) : (
          data && (
            <Table>
              <StudentTableHeader />
              <TableBody>
                {data.slice(page * limit, page * limit + limit).map((user) => (
                  <StudentRow
                    key={user.id}
                    user={user}
                    onDelete={() => onDelete(user.id)}
                  />
                ))}
              </TableBody>
              <TablePagination
                total={data.length}
                page={page}
                setPage={setPage}
                limit={limit}
              />
            </Table>
          )
        )}
      </div>
    </div>
  );
};

export default StudentList;
