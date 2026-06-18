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

const getUserWatchlist = async () => {
    if (!user || !user.id) {
      console.log("⚠️ Auth check failed: No active user session object found.");
      setLoading(false);
      return;
    }

    console.log("🔍 Attempting to query Supabase for User ID:", user.id);

    try {
      const { data, error } = await supabase
        .from("watchlists")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("❌ Supabase DB Query Error:", error);
        throw error;
      }
      
      console.log("🟢 SUCCESS! Data rows received from Supabase:", data);
      setMovies(data || []);
    } catch (error) {
      console.error("💥 Watchlist Component Catch Block triggered:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      getUserWatchlist();
    } else if (user === null) {
      setLoading(false);
    }
  }, [user]);

  const toggleWatched = async (dbRowId, currentStatus) => {
    const nextStatus = !currentStatus;

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

    // Filter out locally
    setMovies((prev) => prev.filter((m) => m.id !== dbRowId));

    try {
      const { error } = await supabase
        .from("watchlists")
        .delete()
        .eq("id", dbRowId);

      if (error) throw error;
    } catch (error) {
      console.error("Failed deleting row instance:", error.message);
      alert("Could not remove movie. Refreshing data list...");
      getUserWatchlist(); // Re-fetch entire structure to clean up mismatch state
    }
  };

  // 📈 Live Statistics Computation
  const totalMovies = movies.length;
  const watchedCount = movies.filter((m) => m.is_watched).length;
  const unwatchedCount = totalMovies - watchedCount;
  const favoritesCount = movies.filter((m) => m.is_favorite).length;

  // 🔍 Computed Selection Filtering Grid Layer
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === "watched") return movie.is_watched;
    if (activeFilter === "unwatched") return !movie.is_watched;
    if (activeFilter === "favorites") return movie.is_favorite;
    return true; // 'all'
  });

  if (loading) {
    return (
      <>
        <Navbar openNav={openNav} toggleNav={toggleNav} />
        <Loader />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#011a2d] text-[#e7e5e4]">
      <Navbar openNav={openNav} toggleNav={toggleNav} />
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold font-[Sora]">My Watchlist</h1>
            <p className="mt-2 text-stone-400 text-sm">
              Movies you've saved for later.
            </p>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search watchlist..."
            className="w-full md:w-80 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-stone-500 text-stone-200 focus:border-white/30 transition-all text-sm"
          />
        </div>

        {/* Live Dynamic Stats Panel Row */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Total Movies
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-white">
              {totalMovies}
            </h3>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Watched
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-emerald-400">
              {watchedCount}
            </h3>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Unwatched
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-amber-500">
              {unwatchedCount}
            </h3>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Favorites
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-pink-500">
              {favoritesCount}
            </h3>
          </div>
        </div>

        {/* Layout Filters Control Tab Row */}
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { id: "all", label: "All" },
            { id: "watched", label: "Watched" },
            { id: "unwatched", label: "Unwatched" },
            { id: "favorites", label: "Favorites" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition cursor-pointer border ${
                activeFilter === tab.id
                  ? "bg-[#e7e5e4] border-[#e7e5e4] text-[#011a2d]"
                  : "border-white/10 text-stone-300 hover:border-white/30 hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Node Evaluation Wrapper */}
        {filteredMovies.length > 0 ? (
          /* Movie Content Grid Matrix */
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id} // 💡 Matches the sequential primary key 'id' inside Supabase
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-stone-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden h-[300px] w-full bg-stone-950">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://placehold.co/400x600?text=No+Poster"
                      }
                      alt={movie.title}
                      className="h-full w-full object-cover transform group-hover:scale-105 transition duration-500"
                    />

                    {/* Floating Corner Favorite Action Button */}
                    <button
                      onClick={() =>
                        toggleFavorite(movie.id, movie.is_favorite)
                      }
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 transition cursor-pointer ${
                        movie.is_favorite
                          ? "bg-pink-600/20 text-pink-500 border-pink-500/30 scale-110"
                          : "bg-black/40 text-stone-400 hover:text-white"
                      }`}
                    >
                      {movie.is_favorite ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <div className="p-4">
                    <h2 className="font-bold text-white text-base line-clamp-1">
                      {movie.title || "Untitled Record"}
                    </h2>
                    <div className="mt-1 flex items-center gap-3 text-xs text-stone-400">
                      <span>
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "N/A"}
                      </span>
                      <span>
                        ⭐{" "}
                        {movie.vote_average
                          ? Number(movie.vote_average).toFixed(1)
                          : "N/A"}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <button
                        onClick={() =>
                          toggleWatched(movie.id, movie.is_watched)
                        }
                        className={`rounded-full px-3 py-0.5 text-[11px] font-semibold transition duration-200 cursor-pointer ${
                          movie.is_watched
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-stone-800 text-stone-400 border border-transparent hover:bg-stone-700"
                        }`}
                      >
                        {movie.is_watched ? "✓ Watched" : " Mark Watched"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Action Sub-Footer Grouping */}
                <div className="p-4 pt-0 mt-2 flex gap-2">
                  <Link
                    to={`/details/${movie.movie_id}`} // 💡 Points back to the raw TMDB identifier field
                    className="flex-1 text-center rounded-xl bg-[#e7e5e4] hover:bg-white py-2 text-xs font-bold text-[#011a2d] transition active:scale-95"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => removeFromWatchlist(movie.id, movie.title)}
                    className="rounded-xl border border-red-500/10 hover:border-red-500/30 bg-red-500/5 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 cursor-pointer active:scale-95"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* empty conditional */
          <div className="mt-16 rounded-2xl border border-dashed border-white/10 p-12 text-center bg-white/5 backdrop-blur-sm max-w-xl mx-auto">
            <div className="text-4xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-white">
              No results found
            </h3>
            <p className="mt-2 text-sm text-stone-400 max-w-xs mx-auto">
              {movies.length === 0
                ? "Your watchlist collection is currently empty."
                : "Try adjustments to your filter properties or text search string."}
            </p>

            {movies.length === 0 && (
              <Link to="/">
                <button className="mt-6 rounded-xl bg-[#e7e5e4] hover:bg-white px-6 py-3 text-sm font-bold text-[#011a2d] transition shadow-md cursor-pointer active:scale-95">
                  Browse Movies
                </button>
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Watchlist;
