import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";

import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/moviesApi";
import { Link } from "react-router-dom";

const Homepage = ({ openNav, toggleNav }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setTrendingMovies).catch(console.error);
  }, []);

  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* hero section */}
      <HeroSlider />

      {/* trending movies */}
      <section className="my-6 px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold font-[Montserrat] text-stone-200 mb-4">
          Trending Movies
        </h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {trendingMovies.map((movie) => (
            <Link
              to={`/details/${movie.id}`}
              key={movie.id}
              className="flex-shrink-0 w-40 md:w-52 lg:w-52 bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-2 text-stone-300 text-sm md:text-base font-semibold">
                {movie.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/*  */}
    </>
  );
};

export default Homepage;
