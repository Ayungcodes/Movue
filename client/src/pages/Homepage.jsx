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
import Footer from "../components/Footer";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Sci-Fi",
  "Thriller",
];

const Homepage = ({ openNav, toggleNav }) => {
  // trending movies
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingError, setTrendingError] = useState(null);

  useEffect(() => {
    getTrendingMovies().then(({ data, error }) => {
      if (error) {
        setTrendingError("Couldn't load trending movies. Please try again.");
        return;
      }
      setTrendingMovies(data);
    });
  }, []);

  // latest movies
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestError, setLatestError] = useState(null);

  useEffect(() => {
    getLatestMovies().then(({ data, error }) => {
      if (error) {
        setLatestError("Couldn't load latest movies. Please try again.");
        return;
      }
      setLatestMovies(data);
    });
  }, []);

  // top-rated movies
  const [topMovies, setTopMovies] = useState([]);
  const [topError, setTopError] = useState(null);

  useEffect(() => {
    getTopRatedMovies().then(({ data, error }) => {
      if (error) {
        setTopError("Couldn't fetch top rated movies. Please try again.");
        return;
      }
      setTopMovies(data);
    });
  }, []);

  // upcoming movies
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingError, setUpcomingError] = useState(null);

  useEffect(() => {
    getUpcomingMovies().then(({ data, error }) => {
      if (error) {
        setUpcomingError("Couldn't fetch upcoming movies. Please try again.");
        return;
      }
      setUpcomingMovies(data);
    });
  }, []);

  return (
    <>
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* hero section */}
      <HeroSlider />

      {/* trending movies */}
      {trendingError ? (
        <p className="text-red-400 text-center">{trendingError}</p>
      ) : (
        <section className="my-6 px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold font-[Montserrat] text-stone-200 mb-4">
            Trending Movies
          </h2>
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide items-center">
            {trendingMovies.slice(0, 5).map((movie) => (
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

            <Link
              to="/trending"
              className="flex-shrink-0 w-40 md:w-52 py-5 h-full flex flex-col items-center justify-center bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 transition group"
            >
              <div className="bg-yellow-500 p-2.5 rounded-full group-hover:scale-110 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <span className="mt-2 text-stone-300 font-bold">View All</span>
            </Link>
          </div>
        </section>
      )}

      {/* latest playing */}
      {latestError ? (
        <p className="text-red-400 text-center">{latestError}</p>
      ) : (
        <section className="my-6 px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold font-[Montserrat] text-stone-200 mb-4">
            Now Playing
          </h2>
          <div className="flex items-center overflow-x-auto space-x-4 scrollbar-hide">
            {latestMovies.slice(0, 5).map((movie) => (
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

            <Link
              to="/nowPlaying"
              className="flex-shrink-0 w-40 md:w-52 py-5 h-full flex flex-col items-center justify-center bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 transition group"
            >
              <div className="bg-yellow-500 p-2.5 rounded-full group-hover:scale-110 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <span className="mt-2 text-stone-300 font-bold">View All</span>
            </Link>
          </div>
        </section>
      )}

      {/* top rated movies */}
      {topError ? (
        <p className="text-red-400 text-center">{topError}</p>
      ) : (
        <section className="my-6 px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold font-[Montserrat] text-stone-200 mb-4">
            Top Rated
          </h2>
          <div className="flex items-center overflow-x-auto space-x-4 scrollbar-hide">
            {topMovies.slice(0, 5).map((movie) => (
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

            <Link
              to="/topRated"
              className="flex-shrink-0 w-40 md:w-52 py-5 h-full flex flex-col items-center justify-center bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 transition group"
            >
              <div className="bg-yellow-500 p-2.5 rounded-full group-hover:scale-110 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <span className="mt-2 text-stone-300 font-bold">View All</span>
            </Link>
          </div>
        </section>
      )}

      {/* upcoming movies */}
      {upcomingError ? (
        <p className="text-red-400 text-center">{upcomingError}</p>
      ) : (
        <section className="my-6 px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold font-[Montserrat] text-stone-200 mb-4">
            Upcoming
          </h2>
          <div className="flex items-center overflow-x-auto space-x-4 scrollbar-hide">
            {upcomingMovies.slice(0, 5).map((movie) => (
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

            <Link
              to="/upcoming"
              className="flex-shrink-0 w-40 md:w-52 py-5 h-full flex flex-col items-center justify-center bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 transition group"
            >
              <div className="bg-yellow-500 p-2.5 rounded-full group-hover:scale-110 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <span className="mt-2 text-stone-300 font-bold">View All</span>
            </Link>
          </div>
        </section>
      )}

      {/* featured movie */}
      <FeaturedMovie />

      {/* browser by genre */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Browse By Genre
          </h2>
          <p className="text-gray-400 mt-2">
            Discover movies based on your favorite genre
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {genres.map((genre) => (
            <Link
              key={genre}
              to={`/genre/${genre.toLowerCase()}`}
              className="
        px-6 py-3
        bg-white/5
        border border-white/10
        text-white
        rounded-xl
        backdrop-blur-md
        hover:bg-yellow-500
        hover:text-black
        hover:scale-105
        transition
        duration-300
        font-medium
        shadow-lg
        "
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>
      {/* footer */}
      <Footer />
    </>
  );
};

export default Homepage;
