import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/moviesApi";

import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";
import Footer from "../components/Footer";

const TrendingMovies = ({ openNav, toggleNav }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* movies grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </div>
      {/* footer */}
      <Footer />
    </>
  );
};

export default TrendingMovies;
