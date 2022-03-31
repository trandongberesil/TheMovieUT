import React, { useEffect, useState } from "react";

function Pagination({ totalPages, page, onChangePage }) {
  const [range, setRange] = useState({
    start: 0,
    end: 10,
  });

  const arrButton = [];
  for (let i = 0; i < totalPages; i++) {
    arrButton.push(i + 1);
  }

  const handlePageChange = (newPage) => {
    onChangePage(newPage);

    if (newPage > range.end){
        setRange((prev) => {
            return {
                start: prev.start + 5,
                end: prev.end + 5,
            }
        })
    }
    
    if (newPage <= range.start){
        setRange((prev) => {
            return {
                start: prev.start - 5,
                end: prev.end - 5,
            }
        })
    }
  };

  return (
    <div className="pagination">
      <button
        className="btn-pagi"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        {"<"}
      </button>

      {arrButton.slice(range.start, range.end).map((btn) => (
        <button
          key={btn}
          className={(page == btn) ? "btn-pagi active" : "btn-pagi"}
          onClick={() => handlePageChange(btn)}
        >
          {btn}
        </button>
      ))}

      <button
        className="btn-pagi"
        disabled={page == totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
