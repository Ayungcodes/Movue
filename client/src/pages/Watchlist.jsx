import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Watchlist = ({ openNav, toggleNav }) => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const getUserWatchlist = async (isMounted = true) => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("watchlists")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (isMounted) {
        const normalizedData = (data || []).map((movie) => ({
          ...movie,
          is_watched: !!movie.is_watched,
          is_favorite: !!movie.is_favorite,
        }));

        setMovies(normalizedData);
      }
    } catch (error) {
      console.error("Watchlist loading framework error:", error.message);
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (user?.id) {
      getUserWatchlist(isMounted);
    } else if (user === null) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  const toggleWatched = async (dbRowId, currentStatus) => {
    const nextStatus = !currentStatus;

    // UI optimistic updates
    setMovies((prev) =>
      prev.map((m) =>
        m.id === dbRowId ? { ...m, is_watched: nextStatus } : m,
      ),
    );

    try {
      const { error } = await supabase
        .from("watchlists")
        .update({ is_watched: nextStatus })
        .eq("id", dbRowId);

      if (error) throw error;
    } catch (error) {
      console.error("Failed updating watch status:", error.message);
      setMovies((prev) =>
        prev.map((m) =>
          m.id === dbRowId ? { ...m, is_watched: currentStatus } : m,
        ),
      );
    }
  };

  const toggleFavorite = async (dbRowId, currentStatus) => {
    const nextStatus = !currentStatus;

    // UI optimistic updates
    setMovies((prev) =>
      prev.map((m) =>
        m.id === dbRowId ? { ...m, is_favorite: nextStatus } : m,
      ),
    );

    try {
      const { error } = await supabase
        .from("watchlists")
        .update({ is_favorite: nextStatus })
        .eq("id", dbRowId);

      if (error) throw error;
    } catch (error) {
      console.error("Failed updating favorite target:", error.message);
      setMovies((prev) =>
        prev.map((m) =>
          m.id === dbRowId ? { ...m, is_favorite: currentStatus } : m,
        ),
      );
    }
  };

  const removeFromWatchlist = async (dbRowId, movieTitle) => {
    if (!window.confirm(`Remove "${movieTitle}" from your watchlist?`)) return;

    // UI optimistic updates
    setMovies((prev) => prev.filter((m) => m.id !== dbRowId));

    try {
      const { error } = await supabase
        .from("watchlists")
        .delete()
        .eq("id", dbRowId);

      if (error) throw error;
    } catch (error) {
      console.error("Failed deleting row instance:", error.message);
      getUserWatchlist();
    }
  };

  // statistics layer
  const totalMovies = movies.length;
  const watchedCount = movies.filter((m) => m.is_watched).length;
  const unwatchedCount = totalMovies - watchedCount;
  const favoritesCount = movies.filter((m) => m.is_favorite).length;

  // filtering layer
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === "watched") return movie.is_watched;
    if (activeFilter === "unwatched") return !movie.is_watched;
    if (activeFilter === "favorites") return movie.is_favorite;
    return true;
  });

  return (
    <div className="bg-stone-950 min-h-screen text-white flex flex-col justify-between">
      <Navbar openNav={openNav} toggleNav={toggleNav} />

      {loading ? (
        <div className="flex-grow flex items-center justify-center min-h-[70vh]">
          <Loader />
        </div>
      ) : (
        <div className="flex-grow pt-[14vh] pb-16 px-4 md:px-10 max-w-7xl mx-auto w-full">
          {/* header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-stone-900 pb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight font-[Montserrat] bg-gradient-to-r from-stone-100 to-stone-400 bg-clip-text text-transparent">
                My Watchlist
              </h1>
              <p className="mt-2 text-stone-400 text-sm md:text-base">
                Your personally curated cinematic library and tracking
                dashboard.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your library..."
                className="w-full rounded-xl border border-stone-800 bg-stone-900/50 px-4 py-3 pl-10 outline-none placeholder:text-stone-500 text-stone-200 focus:border-stone-700 focus:bg-stone-900 transition-all text-sm"
              />
              <span className="absolute left-3.5 top-3.5 text-stone-500 text-sm">
                🔍
              </span>
            </div>
          </div>

          {/* stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                label: "Total Titles",
                value: totalMovies,
                color: "text-white",
              },
              {
                label: "Watched",
                value: watchedCount,
                color: "text-emerald-400",
              },
              {
                label: "Unwatched",
                value: unwatchedCount,
                color: "text-amber-500",
              },
              {
                label: "Favorites",
                value: favoritesCount,
                color: "text-pink-500",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-900 bg-stone-900/20 p-5 backdrop-blur-sm"
              >
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className={`mt-2 text-3xl font-black ${stat.color}`}>
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>

          {/* filtered tabs */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {[
              { id: "all", label: "All Titles" },
              { id: "watched", label: "Watched" },
              { id: "unwatched", label: "Unwatched" },
              { id: "favorites", label: "Favorites" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition cursor-pointer border ${
                  activeFilter === tab.id
                    ? "bg-white border-white text-stone-950"
                    : "border-stone-900 bg-stone-900/30 text-stone-400 hover:border-stone-800 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* filtered movies grid */}
          {filteredMovies.length > 0 ? (
            <div className="mt-10 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="group relative overflow-hidden rounded-2xl border border-stone-900 bg-stone-900/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div className="relative">
                    <div className="relative overflow-hidden aspect-[2/3] w-full bg-stone-950 rounded-t-2xl">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://placehold.co/400x600?text=No+Poster"
                        }
                        alt={movie.title}
                        className="h-full w-full object-cover transform group-hover:scale-103 transition duration-500"
                        loading="lazy"
                      />

                      {/* favorite btn */}
                      <button
                        onClick={() =>
                          toggleFavorite(movie.id, movie.is_favorite)
                        }
                        className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer duration-300 ${
                          movie.is_favorite
                            ? "bg-pink-500/20 text-pink-500 border-pink-500/40 scale-105 shadow-lg shadow-pink-500/10"
                            : "bg-stone-950/60 text-stone-400 border-stone-800 hover:text-white hover:scale-105"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={movie.is_favorite ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="w-4 h-4"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-4">
                      <h2 className="font-bold text-white text-sm md:text-base line-clamp-1 group-hover:text-yellow-400 transition duration-200">
                        {movie.title || "Untitled Record"}
                      </h2>
                      <div className="mt-1 flex items-center gap-3 text-xs text-stone-500 font-medium">
                        <span>
                          {movie.release_date
                            ? new Date(movie.release_date).getFullYear()
                            : "N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          {movie.vote_average
                            ? Number(movie.vote_average).toFixed(1)
                            : "N/A"}
                        </span>
                      </div>

                      <div className="mt-3">
                        <button
                          onClick={() =>
                            toggleWatched(movie.id, movie.is_watched)
                          }
                          className={`rounded-lg px-3 py-1 text-[11px] font-bold tracking-tight transition duration-200 cursor-pointer border ${
                            movie.is_watched
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/5"
                              : "bg-stone-900 text-stone-400 border-stone-800 hover:bg-stone-800 hover:text-stone-300"
                          }`}
                        >
                          {movie.is_watched ? "✓ Watched" : "○ Mark Watched"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex gap-2">
                    <Link
                      to={`/details/${movie.movie_id}`}
                      className="flex-1 text-center rounded-xl bg-stone-100 hover:bg-white py-2.5 text-xs font-extrabold text-stone-950 transition duration-200 shadow-md active:scale-[0.98]"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => removeFromWatchlist(movie.id, movie.title)}
                      className="rounded-xl border border-stone-900 bg-stone-900/40 px-3 py-2.5 text-xs font-bold text-red-400/80 transition duration-200 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 cursor-pointer active:scale-[0.98]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* empty state container fallback */
            <div className="mt-16 rounded-2xl border border-dashed border-stone-900 p-12 text-center bg-stone-900/10 max-w-xl mx-auto">
              <span className="text-4xl mb-4 block">🍿</span>
              <h3 className="text-lg font-bold text-white">
                No entries match your search
              </h3>
              <p className="mt-2 text-sm text-stone-400 max-w-xs mx-auto">
                {movies.length === 0
                  ? "Your collection layout is clean. Let's add some titles to get started!"
                  : "No items match your active dynamic filter selections or search text query."}
              </p>

              {movies.length === 0 && (
                <Link to="/" className="inline-block mt-6">
                  <button className="rounded-xl bg-white hover:bg-stone-100 px-6 py-3 text-xs font-black text-stone-950 transition duration-200 shadow-md active:scale-95 cursor-pointer">
                    Discover New Blockbusters
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
