import { NavLink } from "react-router-dom";

import { useState } from "react";

const Navbar = ({ openNav, toggleNav }) => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "Sci-Fi",
    "Thriller",
    "Horror",
  ];
  return (
    <nav className="navbar w-screen h-[10vh] flex items-center justify-between p-3 md:py-5 md:px-6 text-white z-50">
      {/* logo */}
      <div>
        <NavLink to="/" className="cursor-pointer">
          <h1 className="logo-text text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Movue.
          </h1>
        </NavLink>
      </div>
      {/* hamburger btn */}
      <button
        onClick={toggleNav}
        className={`
    group relative block lg:hidden
    w-10 h-10
    cursor-pointer
    z-999999
    rounded-full
    transition-transform duration-500 shadow-md
    ${openNav ? "hover:rotate-[90deg]" : ""}
  `}
      >
        <span
          className={`
      absolute left-1/2 top-1/2
      h-[1.5px] md:h-[2px] w-7 md:w-10 rounded-full
      transition-all duration-500 ease-in-out
      -translate-x-1/2 -translate-y-1/2 bg-white
      ${openNav ? "rotate-45" : "-translate-y-[5px] md:-translate-y-[6.5px] duration-300 group-hover:bg-stone-100"}
    `}
        />

        <span
          className={`
      absolute left-1/2 top-1/2
      h-[1.5px] md:h-[2px] w-7 md:w-10 rounded-full
      transition-all duration-500 ease-in-out
      -translate-x-1/2 -translate-y-1/2 bg-white
      ${openNav ? "-rotate-45" : "translate-y-[5px] bg md:translate-y-[6.5px] duration-300 group-hover:bg-stone-100"}
    `}
        />
      </button>

      {/* mobile menu */}
      <div
        className={`fixed top-0 right-0 w-[75%] md:w-[55%] h-screen z-50
  bg-slate-900/95 backdrop-blur-xl border-l border-white/10
  transition-transform duration-500 ease-out
  ${openNav ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="px-6 pt-24">
          <ul className="flex flex-col gap-6 text-stone-200 text-lg font-medium">
            <NavLink
              to="/"
              onClick={toggleNav}
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              🏠 Discover
            </NavLink>

            <NavLink
              to="/ai"
              onClick={toggleNav}
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              🤖 AI Recommend
            </NavLink>

            <NavLink
              to="/trending"
              onClick={toggleNav}
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              🔥 Trending
            </NavLink>

            {/* <NavLink
              onClick={toggleNav}
              className="flex items-center gap-3 hover:text-yellow-400 transition"
            >
              ❤️ Watchlist
            </NavLink> */}

            {/* genre */}
            <div className="border-t border-white/10 pt-4">
              <button
                onClick={() => setIsGenreOpen(!isGenreOpen)}
                className="flex items-center justify-between w-full text-left hover:text-yellow-400 transition"
              >
                <span>🎬 Browse Genres</span>

                <svg
                  className={`w-4 h-4 transition-transform ${
                    isGenreOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`grid transition-all duration-300 overflow-hidden ${
                  isGenreOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden grid grid-cols-2 gap-3 text-sm">
                  {genres.map((genre) => (
                    <NavLink
                      key={genre}
                      to={`/genre/${genre.toLowerCase()}`}
                      onClick={toggleNav}
                      className="bg-white/5 hover:bg-yellow-500 hover:text-black
                px-3 py-2 rounded-lg text-center transition"
                    >
                      {genre}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
