import React from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationPage = ({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps) => {
    const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((page) => Math.abs(page - currentPage) <= 2);

    return (
        <div className="flex justify-center mt-2 gap-1 text-xs">
            {/* Tombol halaman pertama dan elipsis */}
            {currentPage > 3 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-2 py-1 border rounded-full hover:bg-gray-100"
                    >
                        1
                    </button>
                    <span className="px-2 py-1">...</span>
                </>
            )}

            {/* Tombol halaman sekitar currentPage */}
            {pagesToShow.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-2 py-1 border cursor-pointer rounded-full ${currentPage === page
                        ? "bg-sky-800 text-white"
                        : "hover:bg-gray-300"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Elipsis dan tombol halaman terakhir */}
            {currentPage < totalPages - 2 && (
                <>
                    <span className="px-2 py-1">...</span>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-2  py-1 border rounded-full hover:bg-gray-100"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Tombol Next */}
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border cursor-pointer rounded-xl hover:bg-gray-100 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationPage;
