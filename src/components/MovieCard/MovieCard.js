import React, { Component } from "react";
import PropTypes from "prop-types";
import { Space, Spin } from "antd";

import MovieRate from "../MovieRate/MovieRate";
import Genre from "../Genre/Gener";

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
        <Space size="middle" style={{ margin: "0 18%" }}>
          <Spin size="large" />
        </Space>
      ) : (
        <img src={poster_path} alt="poster" />
      );
    let borderColorVoteAverage;

    if (vote_average < 3) {
      borderColorVoteAverage = { border: "2px solid #E90000" };
    }
    if ((vote_average >= 3) & (vote_average < 5)) {
      borderColorVoteAverage = { border: "2px solid #E97E00" };
    }
    if ((vote_average >= 5) & (vote_average < 7)) {
      borderColorVoteAverage = { border: "2px solid  #E9D100" };
    }
    if (vote_average >= 7) {
      borderColorVoteAverage = { border: "2px solid  #66E900" };
      return (
        <div className="movie-box">
          {poster}
          <div className="movie-box_info">
            <div className="title">
              <h1>{this.textTruncate(title, 3)}</h1>
              <span className="vote" style={borderColorVoteAverage}>
                {vote_average.toFixed(1)}
              </span>
            </div>
            <h2>{release_date}</h2>
            {genres}
            <p>{this.textTruncate(overview, 15)}</p>
            <MovieRate id={id} />
          </div>
        </div>
      );
    }
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
