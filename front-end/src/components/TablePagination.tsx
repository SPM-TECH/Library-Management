import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export type Attendance = {
  id: number;
  user_name: string;
  nic_number: string;
  index_number: string;
  updated_at: string;
  faculty: string;
  created_at: string;
};

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "user_name",
    header: () => <TableHead className="text-white">Name</TableHead>,
    cell: ({ row }) => (
      <TableCell className="text-white">{row.getValue("user_name")}</TableCell>
    ),
  },
  {
    accessorKey: "faculty",
    header: () => (
      <TableHead className="text-right text-white">Faculty</TableHead>
    ),
    cell: ({ row }) => {
      return (
        <TableCell className=" font-medium text-white">
          {row.getValue("faculty")}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: () => (
      <TableHead className="text-right text-white">Time In</TableHead>
    ),
    cell: ({ row }) => {
      const formatted = format(new Date(row.getValue("updated_at")), "h:mm a");

      return (
        <TableCell className="text-right font-medium text-white">
          {formatted}
        </TableCell>
      );
    },
  },
];

export function TablePagination({ data }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button
        key={i}
        onClick={() => table.setPageIndex(i)}
        className="rounded-full outline-1 outline h-3 bg-slate-600"
      >
        {i + 1}
      </Button>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4"></div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <div>{paginationButtons.map((u) => u)}</div>
        </div>
      </div>
    </div>
  );
}
