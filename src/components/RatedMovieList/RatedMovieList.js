import React, { Component } from "react";

import MovieCard from "../MovieCard/MovieCard";
import MovieService from "../../services/MovieService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import "./RatedMovieList.css";

class RatedMovieList extends Component {
  state = {
    moviesList: [],
    error: false,
  };

  movieService = new MovieService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = async () => {
    let oldItem = JSON.parse(sessionStorage.getItem("RateStorage"));
    if (oldItem === null) {
      oldItem = {};
    }
    let arrayRatedMovie = [];
    for (const [id] of Object.entries(oldItem)) {
      await this.movieService
        .getMovie(parseInt(id))
        .then((result) => {
          arrayRatedMovie.push(result);
        })
        .catch(this.onError);
    }
    this.setState({
      moviesList: arrayRatedMovie,
    });
  };

  onError = () => {
    this.setState({
      error: true,
    });
  };

  renderItems = (arr) => {
    const items = arr.map((item) => {
      const { id } = item;
      return <MovieCard {...item} key={id} />;
    });
    return <div className="rated-list">{items}</div>;
  };

  render() {
    const { moviesList, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const items = this.renderItems(moviesList);
    return (
      <div>
        {errorMessage}
        {items}
      </div>
    );
  }
}

export default RatedMovieList;
