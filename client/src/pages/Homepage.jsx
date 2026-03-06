import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";

import { useEffect, useState } from "react";
import {
  getTrendingMovies,
  getLatestMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/moviesApi";
import { Link } from "react-router-dom";
import FeaturedMovie from "../components/FeaturedMovie";
import BrowseByGenre from "../components/BrowseByGenre";

const Homepage = ({ openNav, toggleNav }) => {
  // trending movies
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setTrendingMovies).catch(console.error);
  }, []);

  // latest movies
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    getLatestMovies().then(setLatestMovies).catch(console.error);
  }, []);

  // top-rated movies
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    getTopRatedMovies().then(setTopMovies).catch(console.error);
  }, []);

  // upcoming movies
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    getUpcomingMovies().then(setUpcomingMovies).catch(console.error);
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

      {/* now playing */}
      <section className="my-6 px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold font-[Montserrat] text-stone-200 mb-4">
          Now Playing
        </h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {latestMovies.map((movie) => (
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

      {/* top rated movies */}
      <section className="my-6 px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold font-[Montserrat] text-stone-200 mb-4">
          Top Rated
        </h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {topMovies.map((movie) => (
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

      {/* upcoming movies */}
      <section className="my-6 px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold font-[Montserrat] text-stone-200 mb-4">
          Upcoming
        </h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {upcomingMovies.map((movie) => (
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

      {/* featured movie */}
      <FeaturedMovie />

      {/* browser by genre */}
      <BrowseByGenre />
    </>
  );
};

export default Homepage;
