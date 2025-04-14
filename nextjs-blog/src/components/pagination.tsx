"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

export function PaginationComponent({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const [cPage, setCPage] = useState(currentPage);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    setCPage(currentPage);
  }, [currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    setPageNumbers(getPageNumbers());
  }, [cPage, totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={cPage > 1 ? `/?page=${cPage - 1}` : ""} />
        </PaginationItem>

        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`/?page=${page}`}
              isActive={currentPage === page ? true : false}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumbers.length > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem >
          <PaginationNext
            href={cPage < totalPages ? `/?page=${cPage + 1}` : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
