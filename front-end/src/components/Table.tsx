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

export function TableDemo() {
  const { data } = useQuery("attendance", getAttendance);

  return (
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
  );
}
