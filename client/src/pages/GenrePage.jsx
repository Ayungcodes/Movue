import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDiscoverMovies } from "../services/moviesApi";

import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const genreMap = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  drama: 18,
  family: 10751,
  fantasy: 14,
  "sci-fi": 878,
  thriller: 53,
  horror: 27,
};

const GenrePage = ({ openNav, toggleNav }) => {
  const { genre } = useParams();
  const normalizedGenre = genre?.toLowerCase();
  const genreId = genreMap[normalizedGenre];

  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGenreMovies = async () => {
      if (!genreId) {
        setMoviesError(`"${genre}" is not a recognized movie genre category.`);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setMoviesError(null);

        const { data, error } = await getDiscoverMovies({
          with_genres: genreId,
          sort_by: "popularity.desc",
        });

        if (error) throw new Error(error);

        if (isMounted) {
          setMovies(data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Genre request exception:", err);
          setMoviesError("Couldn't retrieve titles for this genre right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGenreMovies();

    return () => {
      isMounted = false;
    };
  }, [genreId, genre]);

  return (
    <div className="bg-stone-950 min-h-screen text-white flex flex-col justify-between">
      {/* navbar */}
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {/* loading state */}
      {loading ? (
        <div className="flex-grow flex items-center justify-center min-h-[70vh]">
          <Loader />
        </div>
      ) : (
        <div className="flex-grow pt-[14vh] pb-16 px-4 md:px-10 max-w-7xl mx-auto w-full">
          
          {/* dynamic genre title banner */}
          {!moviesError && (
            <div className="mb-10 border-b border-stone-900 pb-6">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight font-[Montserrat] capitalize bg-gradient-to-r from-stone-100 to-stone-400 bg-clip-text text-transparent">
                {genre === "sci-fi" ? "Sci-Fi" : genre} Movies
              </h1>
              <p className="text-stone-400 text-sm md:text-base mt-2">
                Exploring the top-rated and trending cinematic releases categorized under {normalizedGenre}.
              </p>
            </div>
          )}

          {/* error state */}
          {moviesError ? (
            <div className="my-12 text-center p-8 bg-stone-900/40 border border-stone-850 rounded-2xl max-w-md mx-auto">
              <span className="text-3xl mb-2 block">🎬</span>
              <p className="text-stone-300 font-medium text-sm mb-4">{moviesError}</p>
              <Link 
                to="/"
                className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-950 rounded-xl font-bold text-xs transition duration-200"
              >
                Back to Dashboard
              </Link>
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-20 text-stone-500 font-medium">
              No matching titles found in this category.
            </div>
          ) : (
            /* responsive grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
              {movies.map((movie) => (
                <div key={movie.id} className="transition-all duration-300 hover:-translate-y-1">
                  <MoviesCard movie={movie} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* footer */}
      {!loading && <Footer />}
    </div>
  );
};

export default GenrePage;