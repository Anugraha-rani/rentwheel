import React from 'react'
import { GrChapterPrevious } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";

function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(
    totalItems / itemsPerPage
  );

  return (
    <div className="flex justify-center gap-2 mt-10">

      <button disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
        className="px-4 py-2 border rounded bg-blue-600 text-white"
      >
        <GrChapterPrevious />
      </button>

      {/* {[...Array(totalPages)].map((_, index) => (
        <button
          key={index} onClick={() =>
            setCurrentPage(index + 1)
          }
          className={`px-4 py-2 rounded ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          {index + 1}
        </button>
      ))} */}
      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
        className="px-4 py-2 border rounded bg-blue-600 text-white"
      >
        <GrChapterNext className=''/>
      </button>

    </div>
  );
}
export default Pagination
