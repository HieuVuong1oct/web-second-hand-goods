import React from "react";
import PropTypes from "prop-types";

import {  PaginationItem,Pagination as MUIPagination, } from "@mui/material";


const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MUIPagination
      count={totalPages}
      page={currentPage}
      onChange={handleClick}
      variant="outlined"
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          className={item.page === currentPage ? "active" : ""}
        />
      )}
    />
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;