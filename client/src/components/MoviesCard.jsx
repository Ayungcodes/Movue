import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

import { supabase } from "../lib/supabase";

const MoviesCard = ({ movie }) => {
  const { user } = UseAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = async (e) => {
    e.stopPropagation();
    setShowMenu(false);

    if (!user) {
      window.location.href = "/signup";
      return;
    }

    try {
      const { data, error } = await supabase
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
        ])
        .select();

      if (error) {
        if (error.code === "23505") {
          alert(`💡 "${movie.title}" is already inside your watchlist!`);
          return;
        }
        throw error;
      }

      alert(
        `🎬 "${movie.title}" has been successfully added to your watchlist!`,
      );
    } catch (error) {
      if (error.message?.includes("unique constraint")) {
        alert(`💡 "${movie.title}" is already inside your watchlist!`);
      } else {
        console.error("Watchlist save error:", error.message);
        alert(`Could not save movie: ${error.message}`);
      }
    }
  };

  return (
    <div
      className="group relative rounded-2xl shadow-lg cursor-pointer bg-stone-900 border border-stone-800/40 select-none z-10 hover:z-30 transition-all duration-200"
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className="absolute top-3 right-3 z-40" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-stone-950 text-stone-300 hover:text-white transition-all border border-white/5 shadow-md backdrop-blur-md cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
        <div
          className={`absolute right-0 mt-2 w-56 rounded-xl bg-stone-950/95 backdrop-blur-xl border border-stone-850 p-3 shadow-2xl transition-all duration-200 transform origin-top-right z-50 ${
            showMenu
              ? "opacity-100 scale-100 translate-y-0 visible"
              : "opacity-0 scale-95 -translate-y-1 invisible"
          }`}
        >
          {user ? (
            <button
              onClick={handleActionClick}
              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 text-stone-200 hover:bg-white/5 hover:text-yellow-400"
            >
              <span>➕</span> Add to Watchlist
            </button>
          ) : (
            <div className="flex flex-col gap-3 text-left">
              {/* Login Flow */}
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-stone-400 tracking-wide px-1">
                  Want to add this to a watchlist?
                </p>
                <Link
                  to="/login"
                  onClick={() => setShowMenu(false)}
                  className="w-full text-left px-2.5 py-1.5 text-xs font-bold rounded-lg transition duration-200 flex items-center gap-2 text-stone-200 hover:bg-white/5 hover:text-yellow-400"
                >
                  🔑 Login
                </Link>
              </div>

              <div className="border-t border-stone-800 my-0.5" />

              <div className="space-y-1">
                <p className="text-[11px] font-medium text-stone-400 tracking-wide px-1">
                  Not yet a member?
                </p>
                <Link
                  to="/signup"
                  onClick={() => setShowMenu(false)}
                  className="w-full text-left px-2.5 py-1.5 text-xs font-bold bg-yellow-600 text-stone-950 rounded-lg transition duration-200 hover:bg-yellow-500 flex items-center gap-2 shadow-sm"
                >
                  ✨ Join our community
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[360px] overflow-hidden rounded-2xl relative z-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-5 z-20 rounded-2xl">
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-2 drop-shadow-md">
          {movie.title}
        </h3>

        <p className="text-sm text-amber-400 font-medium mb-4 flex items-center gap-1">
          ⭐ <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
        </p>

        <Link
          to={`/details/${movie.id}`}
          className="w-full text-center py-2.5 bg-yellow-500 hover:bg-yellow-600 text-stone-950 font-bold text-sm rounded-xl transition shadow-md hover:scale-[0.98] active:scale-95 duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MoviesCard;
