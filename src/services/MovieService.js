const API_IMG = "https://image.tmdb.org/t/p/w500/";

class MovieService {
  _apiBase = "https://api.themoviedb.org/3/";
  _apikey = "api_key=8535d1fe3d561bd895e3e137259dd2a8";
  _basePage = 1;
  _query = "";

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllMovies = async (page = this._basePage) => {
    const res = await this.getResource(
      `${this._apiBase}movie/popular?${this._apikey}&language=en-US&page=${page}`
    );
    const total_pages = res.total_pages;
    const result = res.results.map(this._transformMovies);
    return { result, total_pages };
  };

  getGenres = async () => {
    const res = await this.getResource(
      `${this._apiBase}genre/movie/list?${this._apikey}`
    ); // eslint-disable-next-line
        const result = res.genres.reduce((acc, item) => (acc[item.id] = item.name, acc), {})
    return result;
  };

  getMovie = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}movie/${id}?${this._apikey}`
    );
    return this._transformMovie(res);
  };

  getSeachedMovies = async (query = this._query, page = this._basePage) => {
    const res = await this.getResource(
      `${this._apiBase}search/movie?${this._apikey}&query=${query}&page=${page}`
    );
    const total_pages = res.total_pages;
    const result = res.results.map(this._transformMovies);
    return { result, total_pages };
  };

  _transformMovies = (res) => {
    return {
      id: res.id,
      title: res.title,
      overview: res.overview,
      poster_path: API_IMG + res.poster_path,
      vote_average: res.vote_average,
      release_date: res.release_date,
      genres_ids: res.genre_ids,
    };
  };

  _transformMovie = (res) => {
    return {
      id: res.id,
      title: res.title,
      overview: res.overview,
      poster_path: API_IMG + res.poster_path,
      vote_average: res.vote_average,
      release_date: res.release_date,
      genres_ids: res.genres.map((item) => item.id),
    };
  };
}

export default MovieService;
