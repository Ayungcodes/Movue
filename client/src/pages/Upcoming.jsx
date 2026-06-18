import { useEffect, useState } from "react";
import { getUpcomingMovies } from "../services/moviesApi";

import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Upcoming = ({ openNav, toggleNav }) => {
  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUpcoming = async () => {
      try {
        setLoading(true);
        setMoviesError(null);
        
        const { data, error } = await getUpcomingMovies();
        
        if (error) throw new Error(error);
        
        if (isMounted) {
          setMovies(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setMoviesError("We couldn't load the upcoming list. Please try again later.");
          console.error("Upcoming fetch breakdown:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUpcoming();

    return () => {
      isMounted = false;
    };
  }, []);

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
          
          {/* title banner */}
          <div className="mb-10 border-b border-stone-900 pb-6">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-[Montserrat] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              � Upcoming
            </h1>
            <p className="text-stone-400 text-sm md:text-base mt-2">
              Discover the latest and most anticipated movies that are set to hit the big screen soon. Stay ahead of the curve and explore what's coming next in the world of cinema.
            </p>
          </div>

          {/* conditional layout switching */}
          {moviesError ? (
            <div className="my-12 text-center p-8 bg-red-500/5 border border-red-500/10 rounded-2xl max-w-md mx-auto">
              <span className="text-3xl mb-2 block">📡</span>
              <p className="text-red-400 font-medium text-sm">{moviesError}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-stone-900 border border-stone-800 text-stone-300 rounded-xl hover:text-white transition text-xs font-semibold"
              >
                Reload Feed
              </button>
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-20 text-stone-500 font-medium">
              No upcoming titles available at this moment.
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

export default Upcoming;