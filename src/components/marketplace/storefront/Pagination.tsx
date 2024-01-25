interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setPage,
}) => {
  return (
    <div className="flex items-center justify-center transition-all">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-200 px-4 py-2"
      >
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-200 px-4 py-2"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
