import { NavLink } from "react-router-dom";

const Navbar = ({ openNav, toggleNav }) => {
  return (
    <nav className="navbar flex items-center justify-between p-3 md:py-5 md:px-6 text-white">
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

      <div
        className={`fixed top-0 right-0 w-[65%] md:w-[55%] h-screen z-50 bg-blue-900/80 backdrop-blur-sm transition-all duration-500 ease-out
    ${openNav ? "translate-x-0" : "translate-x-full shadow-lg"}`}
      >
        <div>
          <ul className="flex flex-col justify-center h-full gap-8 md:gap-9 mt-24 md:mt-32 mx-6 text-stone-100 text-[16px] md:text-[18px] font-semibold">
            <li>
              <NavLink
                to="/"
                onClick={toggleNav}
                className="hover:text-blue-200 transition-colors duration-300 cursor-pointer"
              >
                🏠 Discover
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleNav}
                className="hover:text-blue-200 transition-colors duration-300 cursor-pointer"
              >
                🤖 AI Recommend
              </NavLink>
            </li>
            <li>
              <NavLink
              to="trending"
                onClick={toggleNav}
                className="hover:text-blue-200 transition-colors duration-300 cursor-pointer"
              >
                🔥 Trending
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleNav}
                className="hover:text-blue-200 transition-colors duration-300 cursor-pointer"
              >
                ❤️ Watchlist
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
