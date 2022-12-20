import { Tabs } from "antd";

import MoviesList from "../MoviesList/MoviesList";
import RatedMovieList from "../RatedMovieList/RatedMovieList";

import "./MovieTabs.css";

const MovieTabs = () => (
  <div className="movie-tabs">
    <Tabs
      defaultActiveKey="1"
      className="tabs"
      centered
      destroyInactiveTabPane
      items={[
        {
          label: "Search",
          key: "1",
          children: <MoviesList />,
        },
        {
          label: "Rate",
          key: "2",
          children: <RatedMovieList />,
        },
      ]}
    />
  </div>
);

export default MovieTabs;
