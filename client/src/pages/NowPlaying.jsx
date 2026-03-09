import { useEffect, useState } from "react";
import { getLatestMovies } from "../services/moviesApi";

import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";

const NowPlaying = ({ openNav, toggleNav }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getLatestMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* movies card */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default NowPlaying;
