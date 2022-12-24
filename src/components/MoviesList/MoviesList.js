import React, { Component, Fragment } from "react";
import { Space, Spin, AutoComplete } from "antd";
import { debounce } from "lodash";

import MovieService from "../../services/MovieService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieCard from "../MovieCard/MovieCard";
import MoviesPagination from "../MoviesPagination/MoviesPagination";

import "./MoviesList.css";

class MoviesList extends Component {
  state = {
    moviesList: [],
    loading: true,
    error: false,
    newMoviesLoading: false,
    page: 1,
    total_pages: 1,
    query: "",
  };

  movieService = new MovieService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (page) => {
    const { query } = this.state;
    if (query !== "") {
      this.onMoviesListLoading();

      this.movieService
        .getSeachedMovies(query, page)
        .then(this.onMoviesListLoaded)
        .catch(this.onError);
    } else {
      this.onMoviesListLoading();

      this.movieService
        .getSeachedMovies("return", page)
        .then(this.onMoviesListLoaded)
        .catch(this.onError);
    }
  };

  handlerSearchChange = debounce((query) => {
    this.setState({
      query,
      page: 1,
    });

    this.onRequest();
  }, 1000);

  changeHandler = (query) => {
    this.setState({
      query,
    });
  };

  changePage = (page) => {
    this.setState({
      page,
    });
    this.onRequest(page);
  };

  onMoviesListLoading = () => {
    this.setState({
      newMoviesLoading: true,
    });
  };

  onMoviesListLoaded = ({ result, total_pages }) => {
    this.setState(({ page }) => ({
      total_pages: total_pages,
      moviesList: [...result],
      loading: false,
      newMoviesLoading: false,
      page,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  renderItems(arr) {
    let items = arr.map((item) => {
      let { id } = item;
      return <MovieCard {...item} key={id} />;
    });
    return <div className="movie-list">{items}</div>;
  }

  render() {
    const { moviesList, loading, error, query, page, total_pages } = this.state;
    const items = this.renderItems(moviesList);
    const moviesPaginationBTN =
      total_pages !== 1 ? (
        <MoviesPagination
          onPageClick={this.changePage}
          total_pages={total_pages}
          current={page}
        />
      ) : null;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner =
      loading && query !== "" ? (
        <Space size="middle" className="movie-box_info spinner">
          <Spin size="large" />
        </Space>
      ) : null;
    const content = !(loading || error) ? items : null;

    return (
      <Fragment>
        <AutoComplete
          className="auto-complete"
          onSearch={this.handlerSearchChange}
          placeholder="Type to search..."
          value={this.state.query}
          onChange={this.changeHandler}
        />
        <div className="movies-list">
          {errorMessage}
          {spinner}
          {content}
        </div>
        {moviesPaginationBTN}
      </Fragment>
    );
  }
}

export default MoviesList;
