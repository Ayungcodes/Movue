import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import MoviesCard from "../components/MoviesCard";
import FeaturedMovie from "../components/FeaturedMovie";
import Footer from "../components/Footer";

import {
  getTrendingMovies,
  getLatestMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/moviesApi";

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime",
  "Drama", "Fantasy", "Horror", "Sci-Fi", "Thriller",
];

const Homepage = ({ openNav, toggleNav }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [trending, latest, top, upcoming] = await Promise.all([
          getTrendingMovies(),
          getLatestMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
        ]);

        setTrendingMovies(trending?.data || []);
        setLatestMovies(latest?.data || []);
        setTopMovies(top?.data || []);
        setUpcomingMovies(upcoming?.data || []);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError("Something went wrong while loading movies. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const renderMovieRow = (title, movies, viewAllPath) => {
    return (
      <section className="my-8 px-4 md:px-10">
        {loading ? (
          <div className="h-7 w-48 bg-stone-800 animate-pulse rounded-lg mb-5" />
        ) : (
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-stone-100 mb-5 font-[Montserrat]">
            {title}
          </h2>
        )}

        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex space-x-5 py-3 items-stretch">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <MovieCardSkeleton key={i} />)
            ) : (
              <>
                {movies.slice(0, 10).map((movie) => (
                  <div key={movie.id} className="flex-shrink-0 w-44 md:w-56">
                    <MoviesCard movie={movie} />
                  </div>
                ))}

                {movies.length > 0 && (
                  <Link
                    to={viewAllPath}
                    className="flex-shrink-0 w-44 md:w-56 flex flex-col items-center justify-center bg-stone-900/40 hover:bg-stone-900/90 rounded-2xl border border-dashed border-stone-800 transition-all duration-300 group px-4 text-center min-h-[360px]"
                  >
                    <div className="bg-yellow-500 text-stone-950 p-3 rounded-full group-hover:scale-110 shadow-lg transition duration-300 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <span className="text-stone-200 font-bold text-sm tracking-wide group-hover:text-yellow-400 transition">
                      View All
                    </span>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-stone-950 min-h-screen text-white overflow-hidden">
      <Navbar openNav={openNav} toggleNav={toggleNav} />
      <HeroSlider />

      {error ? (
        // UI error state with retry btn
        <div className="max-w-md mx-auto my-16 text-center p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
          <p className="text-red-400 font-medium mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-stone-900 border border-stone-800 text-stone-300 rounded-xl hover:text-white transition"
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <div className="space-y-4 relative z-20">
          {renderMovieRow("Trending Movies", trendingMovies, "/trending")}
          {renderMovieRow("Latest Releases", latestMovies, "/latest")}
          {renderMovieRow("Top Rated", topMovies, "/top-rated")}
          {renderMovieRow("Upcoming Blockbusters", upcomingMovies, "/upcoming")}
        </div>
      )}

      <FeaturedMovie />

      {/* browse by genre section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white font-[Montserrat]">
            Browse By Genre
          </h2>
          <p className="text-stone-400 text-sm mt-1.5">
            Discover movies curated across your favorite cinematic styles.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <Link
              key={genre}
              to={`/genre/${genre.toLowerCase()}`}
              className="px-5 py-3 bg-stone-900 border border-stone-800/60 text-stone-300 rounded-xl hover:bg-yellow-500 hover:text-stone-950 hover:border-yellow-500 hover:font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm font-medium shadow-sm"
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;