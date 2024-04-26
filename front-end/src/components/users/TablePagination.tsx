import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type Props = {
  total: number;
};

function TablePagination({ total }: Props) {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(30);

  const buttons = Math.ceil(total / itemsPerPage);

  const next = () => {
    if (page < buttons) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prev} />
        </PaginationItem>
        {Array.from({ length: buttons }, (_, index) => index + 1).map((i) => (
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setPage(i)}>{i}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={next} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default TablePagination;
