import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ openNav, toggleNav }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, signOut } = useAuth();

  // handle transparent to dark bg blend on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", 
    "Drama", "Family", "Fantasy", "Sci-Fi", "Thriller", "Horror"
  ];

  // styling helper for active main nav tabs
  const navLinkStyle = ({ isActive }) => 
    `relative py-2 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
      isActive ? "text-yellow-400 font-semibold" : "text-stone-300 hover:text-white"
    }`;

  const activeUnderline = ({ isActive }) =>
    isActive ? "absolute bottom-0 left-0 w-full h-[2px] bg-yellow-400 rounded-full" : "hidden";

  return (
    <nav 
      className={`fixed top-0 left-0 w-full h-[10vh] flex items-center justify-between px-4 md:px-10 text-white z-50 transition-all duration-300 ${
        scrolled || openNav
          ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-900 shadow-xl" 
          : "bg-gradient-to-b from-stone-950/80 to-transparent"
      }`}
    >
      {/* logo */}
      <div className="relative z-[60]">
        <Link to="/" className="cursor-pointer select-none">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent hover:opacity-90 transition">
            Movue.
          </h1>
        </Link>
      </div>

      {/* desktop navlinks */}
      <ul className="hidden lg:flex items-center gap-7">
        <NavLink to="/" className={navLinkStyle}>
          {({ isActive }) => (
            <>
              <span>Discover</span>
              <span className={activeUnderline({ isActive })} />
            </>
          )}
        </NavLink>

        <NavLink to="/ai" className={navLinkStyle}>
          {({ isActive }) => (
            <>
              <span>🤖 AI Recommend</span>
              <span className={activeUnderline({ isActive })} />
            </>
          )}
        </NavLink>

        <NavLink to="/trending" className={navLinkStyle}>
          {({ isActive }) => (
            <>
              <span>Trending</span>
              <span className={activeUnderline({ isActive })} />
            </>
          )}
        </NavLink>

        <NavLink to="/watchlist" className={navLinkStyle}>
          {({ isActive }) => (
            <>
              <span>Watchlist</span>
              <span className={activeUnderline({ isActive })} />
            </>
          )}
        </NavLink>

        {/* desktop genre dropdown */}
        <div
          className="relative py-2"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button className="flex items-center gap-1 text-sm font-medium text-stone-300 hover:text-white transition cursor-pointer">
            Browse Genres
            <svg
              className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${isHovering ? "rotate-180 text-yellow-400" : ""}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`absolute left-1/2 -translate-x-1/2 mt-3 w-[340px] p-4 rounded-xl bg-stone-950/95 backdrop-blur-2xl border border-stone-800 shadow-2xl transition-all duration-200 origin-top z-50 ${
              isHovering ? "opacity-100 visible scale-100 translate-y-0" : "opacity-0 invisible scale-95 -translate-y-2"
            }`}
          >
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {genres.map((genre) => (
                <NavLink
                  key={genre}
                  to={`/genre/${genre.toLowerCase()}`}
                  className={({ isActive }) => `px-3 py-2.5 rounded-lg text-center transition-all ${
                    isActive 
                      ? "bg-yellow-500 text-stone-950" 
                      : "bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {genre}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </ul>

      {/* desktop auth controls */}
      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-stone-300 flex items-center gap-2 bg-stone-900 border border-stone-800 px-3 py-2 rounded-full shadow-inner select-none">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="max-w-[120px] truncate">
                {user?.user_metadata?.name?.split(" ")[0] || user?.email || "User"}
              </span>
            </span>
            <button
              onClick={signOut}
              className="text-stone-400 hover:text-red-400 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-stone-900/50 transition duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link to="/login" className="text-stone-300 hover:text-white px-3 py-2 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-yellow-500 text-stone-950 px-5 py-2 rounded-full transition duration-200 hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] active:scale-95"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* hamburger menu */}
      <button
        onClick={toggleNav}
        className="relative block lg:hidden w-10 h-10 cursor-pointer z-[60] rounded-full hover:bg-stone-900/60 transition"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4 flex flex-col justify-between">
          <span className={`h-[2px] w-full bg-white rounded-full transition-all duration-300 ${openNav ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`h-[2px] w-full bg-white rounded-full transition-opacity duration-200 ${openNav ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-full bg-white rounded-full transition-all duration-300 ${openNav ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </div>
      </button>

      {/* mobile backdrop */}
      <div
        className={`fixed inset-0 h-screen w-full bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          openNav ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleNav}
      />

      {/* mobile menu */}
      <div
        className={`fixed top-0 right-0 w-[75%] md:w-[45%] h-screen z-50 bg-stone-950 border-l border-stone-900 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between p-6 pt-24 ${
          openNav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-5 overflow-y-auto pr-1">
          <ul className="flex flex-col gap-4 text-stone-200 text-base font-semibold">
            <NavLink to="/" onClick={toggleNav} className={navLinkStyle}>
              🏠 Discover
            </NavLink>
            <NavLink to="/ai" onClick={toggleNav} className={navLinkStyle}>
              🤖 AI Recommend
            </NavLink>
            <NavLink to="/trending" onClick={toggleNav} className={navLinkStyle}>
              🔥 Trending
            </NavLink>
            <NavLink to="/watchlist" onClick={toggleNav} className={navLinkStyle}>
              📋 Watchlist
            </NavLink>
          </ul>

          <div className="border-t border-stone-900 pt-4 mt-2">
            <button
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              className="flex items-center justify-between w-full text-stone-300 font-semibold text-base py-1 hover:text-yellow-400 transition"
            >
              <span>Browse Genres</span>
              <svg
                className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${isGenreOpen ? "rotate-180 text-yellow-400" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isGenreOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden grid grid-cols-2 gap-2 text-xs font-medium">
                {genres.map((genre) => (
                  <NavLink
                    key={genre}
                    to={`/genre/${genre.toLowerCase()}`}
                    onClick={toggleNav}
                    className={({ isActive }) => `px-2 py-2 rounded-lg text-center transition-all ${
                      isActive ? "bg-yellow-500 text-stone-950 font-bold" : "bg-stone-900 text-stone-300"
                    }`}
                  >
                    {genre}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-900 pt-4 bg-stone-950">
          {user ? (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium text-stone-300 flex items-center justify-center gap-2 bg-stone-900 border border-stone-800 px-3 py-2.5 rounded-xl shadow-inner select-none">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className="truncate">{user?.user_metadata?.name || user?.email}</span>
              </span>
              <button
                onClick={() => { signOut(); toggleNav(); }}
                className="w-full bg-stone-900 text-stone-400 hover:text-red-400 font-bold text-sm py-2.5 rounded-xl border border-stone-800 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 text-center">
              <Link
                to="/login"
                onClick={toggleNav}
                className="w-full text-stone-300 hover:text-white font-bold text-sm py-2.5 rounded-xl hover:bg-stone-900 transition border border-transparent"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={toggleNav}
                className="w-full bg-yellow-500 text-stone-950 font-black text-sm py-2.5 rounded-xl shadow-md transition"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;