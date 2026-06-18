import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const MovieDetails = ({ openNav, toggleNav }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [providers, setProviders] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // watchlist state and notification
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const getMovieById = async () => {
    const BASE_URL = "https://movue-backend.onrender.com";
    try {
      const res = await fetch(`${BASE_URL}/api/movies/${id}`);
      if (!res.ok) throw new Error("Movie not found");
      const data = await res.json();
      setMovie(data);

      const trailerRes = await fetch(`${BASE_URL}/api/movies/${id}/trailer`);
      if (trailerRes.ok) {
        const trailerData = await trailerRes.json();
        setTrailer(trailerData);
      } else {
        setTrailer(null);
      }

      const providerRes = await fetch(`${BASE_URL}/api/movies/${id}/providers`);
      if (providerRes.ok) {
        const providerData = await providerRes.json();
        setProviders(providerData);
      } else {
        setProviders(null);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieById();
  }, [id]);

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const handleAddToWatchlist = async () => {
    if (!user) {
      navigate("/signup");
      return;
    }

    setWatchlistLoading(true);
    try {
      const { error } = await supabase
        .from("watchlists")
        .insert([
          {
            user_id: user.id,
            movie_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
            is_watched: false,
            is_favorite: false,
          },
        ]);

      if (error) {
        if (error.code === "23505") {
          triggerToast(`"${movie.title}" is already in your watchlist!`, "info");
          return;
        }
        throw error;
      }

      triggerToast(`Added "${movie.title}" to your watchlist!`, "success");
    } catch (error) {
      if (error.message?.includes("unique constraint")) {
        triggerToast(`"${movie.title}" is already in your watchlist!`, "info");
      } else {
        console.error("Watchlist save error:", error.message);
        triggerToast("Could not save movie. Try again.", "error");
      }
    } finally {
      setWatchlistLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar openNav={openNav} toggleNav={toggleNav} />
        <Loader />
      </>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center space-y-5 text-center">
        <p className="text-stone-400 font-medium">No cinematic data found for this asset.</p>
        <Link to="/" className="px-5 py-2.5 bg-stone-900 border border-stone-800 text-stone-200 text-sm font-bold rounded-xl hover:bg-stone-800 transition">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar openNav={openNav} toggleNav={toggleNav} />

\      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -10, x: "-50%" }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl px-5 py-3 text-sm font-bold border shadow-2xl backdrop-blur-xl flex items-center gap-2.5 ${
              toast.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-950/20"
                : toast.type === "info"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-950/20"
                : "bg-red-500/10 text-red-400 border-red-500/20 shadow-red-950/20"
            }`}
          >
            <span>{toast.type === "success" ? "🍿" : toast.type === "info" ? "💡" : "❌"}</span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen text-white bg-stone-950">
        <div className="absolute inset-0 h-[65vh] md:h-screen">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            
            {/* poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-64 md:w-72 rounded-2xl shadow-2xl border border-stone-800/40"
              />
            </div>

            {/* info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 font-[Montserrat]">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3.5 text-sm font-semibold tracking-wide text-stone-400 mb-6">
                <span className="bg-amber-400/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-black">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
                <span className="flex items-center gap-1">📅 {movie.release_date?.split("-")[0] || movie.release_date}</span>
                <span className="text-stone-600">•</span>
                <span>🔥 Popularity: {Math.round(movie.popularity)}</span>
              </div>

              {/* action */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold rounded-xl transition shadow-lg flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <span>▶</span> Watch Trailer
                  </button>
                )}

                <button
                  onClick={handleAddToWatchlist}
                  disabled={watchlistLoading}
                  className="px-6 py-3 bg-stone-900 border border-stone-800 text-stone-200 hover:text-white hover:bg-stone-800 disabled:opacity-40 active:scale-[0.98] font-bold rounded-xl transition flex items-center gap-2 text-sm cursor-pointer"
                >
                  {watchlistLoading ? "Synchronizing..." : "➕ Add to Watchlist"}
                </button>
              </div>

              {/* genre */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-stone-900/60 backdrop-blur-md border border-stone-800 text-stone-400 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-stone-400 leading-relaxed max-w-3xl text-sm md:text-base font-medium mb-8">
                {movie.overview}
              </p>

              {/* providers */}
              {providers?.flatrate && providers.flatrate.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-stone-900">
                  <h3 className="text-xs font-black text-stone-500 tracking-widest uppercase">Where to Stream</h3>
                  <div className="flex flex-wrap gap-3">
                    {providers.flatrate.map((provider) => (
                      <a
                        key={provider.provider_id}
                        href={providers.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 bg-stone-900/50 hover:bg-stone-900 border border-stone-800 transition px-4 py-2.5 rounded-xl text-xs font-bold text-stone-300 hover:text-white cursor-pointer"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="w-5 h-5 rounded-md object-cover"
                        />
                        <span>{provider.provider_name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-stone-400 hover:text-white font-bold tracking-wide transition text-sm cursor-pointer flex items-center gap-1"
            >
              ✕ Close
            </button>
            <div className="aspect-video shadow-2xl rounded-2xl border border-stone-800 overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title="Movie Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MovieDetails;