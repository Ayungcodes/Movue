import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/moviesApi";

import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const TrendingMovies = ({ openNav, toggleNav }) => {
  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    getTrendingMovies().then(({ data, error }) => {
      if (error) {
        setMoviesError("Couldn't fetch trending movies");
        return;
      }
      setMovies(data);
    });
  }, []);

  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* movies grid */}
          {moviesError ? (
            <p className="text-red-400 text-center">{moviesError}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MoviesCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {/* footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default TrendingMovies;
