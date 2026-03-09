import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { getTrendingMovies } from "../services/moviesApi";
import { Link } from "react-router-dom";

const TrendingMovies = ({ openNav, toggleNav }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* movies card */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[360px] object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-4">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                {movie.title}
              </h3>

              <p className="text-sm text-gray-300 mb-4">
                ⭐ {movie.vote_average?.toFixed(1)}
              </p>

              <Link
                to={`/movies/${movie.id}`}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrendingMovies;
