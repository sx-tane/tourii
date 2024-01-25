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
    <div className="flex items-center justify-center font-bold text-warmGrey3">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-2 text-sm font-bold uppercase tracking-widest"
      >
        Previous
      </button>
      <span className="mx-2">|</span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-2 text-sm font-bold uppercase tracking-widest"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
