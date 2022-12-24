import React, { Component } from "react";
import PropTypes from "prop-types";
import { Space } from "antd";
import { FrownOutlined } from "@ant-design/icons";

import MovieRate from "../MovieRate/MovieRate";
import Genre from "../Genre/Gener";
import VoteAverage from "../VoteAverage/VoteAverage";

import "./MovieCard.css";

class MovieCard extends Component {
  textTruncate = (text, value) => {
    const valueToCut = value;
    let wordsArray = text.split(" ");
    let cutted = "";
    for (let i = 0; i < valueToCut; i++) {
      if (wordsArray[i] === undefined) {
        break;
      }
      if (i === valueToCut - 1) {
        cutted += wordsArray[i] + "...";
        break;
      }
      cutted += wordsArray[i] + " ";
    }
    return cutted;
  };

  renderGenres = (genres_ids) => {
    let key = 0;
    let genres = genres_ids.map((genre_id) => {
      return <Genre genre_id={genre_id} key={key++} />;
    });

    return <div className="geners-box">{genres}</div>;
  };

  render() {
    const {
      title,
      poster_path,
      vote_average,
      release_date,
      overview,
      genres_ids,
      id,
    } = this.props;

    const genres = this.renderGenres(genres_ids);
    const poster =
      poster_path === "https://image.tmdb.org/t/p/w500/null" ? (
        <Space className="img-box">
          <FrownOutlined className="no-img" />
        </Space>
      ) : (
        <img src={poster_path} alt="poster" />
      );

    return (
      <div className="movie-box">
        {poster}
        <div className="movie-box_info">
          <div className="title">
            <h1>{this.textTruncate(title, 3)}</h1>
            <VoteAverage vote_average={vote_average} />
          </div>
          <h2>{release_date}</h2>
          {genres}
          <p>{this.textTruncate(overview, 20)}</p>
        </div>
        <MovieRate id={id} />
      </div>
    );
  }
}

MovieCard.propTypes = {
  title: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  release_date: PropTypes.string,
  overview: PropTypes.string,
  genres_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.number,
};

export default MovieCard;
