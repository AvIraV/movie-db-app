import React, { Component } from "react";

import MovieTabs from "../MovieTabs/MovieTabs";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import MovieService from "../../services/MovieService";
import GenresContext from "../Context/Context";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import "./App.css";

class App extends Component {
  state = {
    genres_id: {},
    error: false,
  };

  componentDidMount() {
    this.onGetGenresArray();
  }

  movieService = new MovieService();

  onGetGenresArray = async () => {
    await this.movieService
      .getGenres()
      .then((result) => {
        this.setState({ genres_id: result });
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      error: true,
    });
  };

  render() {
    const { error } = this.state;
    const content = error ? <ErrorMessage /> : <MovieTabs />;
    return (
      <GenresContext.Provider value={this.state.genres_id}>
        <div className="app">
          <ErrorBoundary>{content}</ErrorBoundary>
        </div>
      </GenresContext.Provider>
    );
  }
}

export default App;
