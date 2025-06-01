import React from "react";

interface QuestPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const QuestPagination: React.FC<QuestPaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	return (
		<div className="flex justify-center items-center gap-4 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-4 py-2 rounded bg-[#e0d7c6] text-[#5c4a1c] font-semibold disabled:opacity-50"
			>
				Previous
			</button>
			<span className="text-[#5c4a1c] font-medium">
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-4 py-2 rounded bg-[#e0d7c6] text-[#5c4a1c] font-semibold disabled:opacity-50"
			>
				Next
			</button>
		</div>
	);
};

export default QuestPagination;
