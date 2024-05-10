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
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
};

function TablePagination({ total, page, setPage, limit }: Props) {
  const buttons = Math.ceil(total / limit);

  const next = () => {
    if (page < buttons) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prev} className=" cursor-pointer" />
        </PaginationItem>
        {Array.from({ length: buttons }, (_, index) => index + 1).map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className=" cursor-pointer"
              onClick={() => setPage(i - 1)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis className="t" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={next} className=" cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default TablePagination;
