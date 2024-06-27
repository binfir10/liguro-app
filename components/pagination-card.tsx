import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handlePageClick: (page: number) => void;
}

export default function PaginationComponent({
  totalPages,
  currentPage,
  handlePrevPage,
  handleNextPage,
  handlePageClick,
}: PaginationComponentProps) {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevPage}
            className={currentPage === 1 ? "isDisabled hover:text-muted hover:bg-transparent" : "cursor-pointer"}
            //disabled={currentPage === 1}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => handlePageClick(index + 1)}
              isActive={currentPage === index + 1}
              className={`${currentPage === index + 1 ? "border border-border" : ""} cursor-pointer`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 3 && <PaginationEllipsis />}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            className={currentPage === totalPages ? "isDisabled hover:text-muted hover:bg-transparent" : "cursor-pointer"}
            //disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
