import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import TrendingMovies from "./pages/TrendingMovies";
import NowPlaying from "./pages/NowPlaying";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import GenrePage from "./pages/GenrePage";
import AIRecommend from "./pages/AIRecommend";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const { user } = useAuth();
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
      <Route
        path="/genre/:genre"
        element={<GenrePage openNav={openNav} toggleNav={toggleNav} />}
      />
      <Route
        path="/ai"
        element={<AIRecommend openNav={openNav} toggleNav={toggleNav} />}
      />
      <Route
        path="/watchlist"
        element={
          user ? (
            <Watchlist openNav={openNav} toggleNav={toggleNav} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/login"
        element={<Login openNav={openNav} toggleNav={toggleNav} />}
      />
      <Route
        path="/signup"
        element={<Signup openNav={openNav} toggleNav={toggleNav} />}
      />
    </Routes>
  );
};

export default App;
