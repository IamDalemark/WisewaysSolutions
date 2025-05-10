import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationControls: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-10 gap-2 text-lg">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-1.5 rounded-lg bg-blue-green text-gray-white transition-all
          ${currentPage === 1 ? "opacity-75 cursor-default" : "hover:bg-[#FD8432] hover:scale-105 cursor-pointer"}`}
      >
        Prev
      </button>
      <span className="px-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-1.5 rounded-lg bg-blue-green text-gray-white transition-all
          ${currentPage === totalPages ? "opacity-75 cursor-default" : "hover:bg-[#FD8432] hover:scale-105 cursor-pointer"}`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
