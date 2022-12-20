import React from "react";
import PropTypes from "prop-types";

import GenresContext from "../Context/Context";

import "./Gener.css";

const Genre = ({ genre_id }) => (
  <GenresContext.Consumer>
    {(value) => <div className="genres">{value[genre_id]}</div>}
  </GenresContext.Consumer>
);

Genre.propTypes = {
  genre_id: PropTypes.number,
};

export default Genre;
