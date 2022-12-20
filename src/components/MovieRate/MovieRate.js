import React, { Component } from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";

import MovieService from "../../services/MovieService";

import "./MovieRate.css";

class MovieRate extends Component {
  state = {
    rate: 0,
  };

  componentDidMount() {
    this.onInitRate();
  }

  movieService = new MovieService();

  onChangeToRate = (rate) => {
    const { id } = this.props;
    let oldItem = JSON.parse(sessionStorage.getItem("RateStorage"));
    if (oldItem === null) {
      oldItem = { [id]: rate };
    }
    if (oldItem !== null) {
      Object.assign(oldItem, { [id]: rate });
    } // eslint-disable-next-line
    {window.sessionStorage.setItem('RateStorage', JSON.stringify(oldItem))} 
    this.setState({
      rate,
    });
  };

  onInitRate = () => {
    const { id } = this.props;
    let oldItem = JSON.parse(sessionStorage.getItem("RateStorage"));
    if (this.state.rate === 0) {
      for (const key in oldItem) {
        if (id === parseInt(key)) {
          this.setState(() => {
            return {
              rate: oldItem[key],
            };
          });
        }
      }
    }
  };

  render() {
    return (
      <span className="movie-rate">
        <Rate
          allowHalf
          defaultValue={0}
          count={10}
          className="rate"
          value={this.state.rate}
          onChange={this.onChangeToRate}
        />
      </span>
    );
  }
}

MovieRate.propTypes = {
  id: PropTypes.number,
};

export default MovieRate;
