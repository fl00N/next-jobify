"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

type ButtonProps = {
  page: number;
  activeClass: boolean;
};

function ButtonContainer({ currentPage, totalPages }: ButtonContainerProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size="icon"
        variant={activeClass ? "default" : "outline"}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 }),
    );

    if (currentPage > 3) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>,
      );
    }

    if (currentPage > 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false,
        }),
      );
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        }),
      );
    }

    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          activeClass: false,
        }),
      );
    }

    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>,
      );
    }

    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      }),
    );

    return pageButtons;
  };

  return (
    <div className="flex  gap-x-2">
      <Button
        className="flex items-center gap-x-2 cursor-pointer"
        variant="outline"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <ChevronLeft />
        Prev
      </Button>
      {renderPageButtons()}
      <Button
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
        variant="outline"
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  );
}
export default ButtonContainer;
