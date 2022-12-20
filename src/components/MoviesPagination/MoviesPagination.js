import React from "react";
import { Pagination } from "antd";
import PropTypes from "prop-types";

import "./MoviesPagination.css";

const MoviesPagination = ({ onPageClick, total_pages, current }) => {
  return (
    <div className="movies-pagination">
      <Pagination
        defaultCurrent={1}
        current={current}
        total={total_pages * 10}
        showSizeChanger={false}
        onChange={onPageClick}
      />
    </div>
  );
};

MoviesPagination.propTypes = {
  onPageClick: PropTypes.func,
  total_pages: PropTypes.number,
  current: PropTypes.number,
};

export default MoviesPagination;
