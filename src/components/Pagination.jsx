import React, { useEffect, useCallback, useState } from 'react';
import icons from '../utils/icons.json';
import useUrls from '../hooks/useUrls';

const Pagination = React.memo(({ search, filters, currentPage, handlePreviousPageChange, handlePageChange, handleNextPageChange }) => {
  const [totalRecords, setTotalRecords] = useState(0);
  const totalPages = Math.ceil(totalRecords / 400);
  const { urls } = useUrls();

  const getTotalRecords = useCallback(async () => {
    const json_data = {
      total_records: true,
      search: search,
      filtersSidebar: filters
  };
    const response = await fetch(`${urls.ws}/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json_data),
    });
    const data = await response.json();
    setTotalRecords(data.total_records);
  }, [search, filters, urls.ws]);

  useEffect(() => {
    getTotalRecords();
  }, [getTotalRecords]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-2 py-1 ${currentPage === i ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(i)}
            aria-label={`Page ${i}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > delta + 2) {
        pageNumbers.push(
          <button
            key={1}
            className={`px-2 py-1 ${currentPage === 1 ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(1)}
            aria-label="Page 1"
          >
            1
          </button>,
          <span key="start-ellipsis" className="px-2">...</span>
        );
      }

      for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-2 py-1 ${currentPage === i ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(i)}
            aria-label={`Page ${i}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - delta - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className="px-2">...</span>,
          <button
            key={totalPages}
            className={`px-2 py-1 ${currentPage === totalPages ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(totalPages)}
            aria-label={`Page ${totalPages}`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="px-3 py-3 rounded-lg w-full md:w-1/2 flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-6 items-center m-auto text-center bg-white shadow-lg mb-2">
      <div className="w-full">
        <span className="text-md text-gray-500 font-semibold">Total records: {totalRecords}</span>
      </div>
      <div className="w-full flex items-center space-x-2">
        <button
          className={`px-2 py-1 ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-400'}`}
          onClick={handlePreviousPageChange}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <span className="text-white" dangerouslySetInnerHTML={{ __html: icons.leftArrow }}></span>
        </button>
        <div className="flex items-center space-x-2">
          {renderPageNumbers()}
        </div>
        <button
          className={`px-2 py-1 ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-400'}`}
          onClick={handleNextPageChange}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <span className="text-white" dangerouslySetInnerHTML={{ __html: icons.rightArrow }}></span>
        </button>
      </div>
    </div>
  );
});

export default Pagination;
