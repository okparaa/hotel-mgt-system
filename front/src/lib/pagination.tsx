import { useState } from "preact/hooks";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (num: number) => void;
};

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          onClick={() => handleClick(i)}
          key={i}
          className={
            i === currentPage
              ? "bg-blue-500 text-white px-4 py-2 mx-1 rounded flex items-center justify-center"
              : "bg-gray-200 text-gray-700 px-4 py-2 mx-1 rounded flex items-center justify-center"
          }
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <ul>{renderPageNumbers()}</ul>
    </div>
  );
};

export default Pagination;
