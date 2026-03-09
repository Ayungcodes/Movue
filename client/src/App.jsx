import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import TrendingMovies from "./pages/TrendingMovies";
import NowPlaying from "./pages/NowPlaying";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";

const App = () => {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav((prev) => !prev);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Homepage openNav={openNav} toggleNav={toggleNav} />}
      />
      <Route
        path="details/:id"
        element={<MovieDetails openNav={openNav} toggleNav={toggleNav} />}
      />
      <Route
        path="/trending"
        element={<TrendingMovies openNav={openNav} toggleNav={toggleNav} />}
      />
      <Route
        path="/nowPlaying"
        element={<NowPlaying openNav={openNav} toggleNav={toggleNav} />}
      />
      <Route
        path="/topRated"
        element={<TopRated openNav={openNav} toggleNav={toggleNav} />}
      />
      <Route
        path="/upcoming"
        element={<Upcoming openNav={openNav} toggleNav={toggleNav} />}
      />
    </Routes>
  );
};

export default App;
