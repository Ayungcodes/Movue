import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 text-stone-400 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-black font-[Montserrat] bg-gradient-to-r from-stone-100 via-stone-300 to-stone-500 bg-clip-text text-transparent tracking-tight">
            Movue.
          </h2>

          <p className="text-xs md:text-sm text-stone-500 leading-relaxed max-w-sm font-medium">
            Discover movies like never before. Movue helps you explore trending
            films, track your personal watchlist, and discover premium cinematic
            assets.
          </p>

          <div className="flex gap-4 pt-2 text-xs font-bold text-stone-600">
            <a
              href="https://x.com/_Gaius_Emmanuel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition"
            >
              Twitter
            </a>
            <a
              href="https://github.com/Ayungcodes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gaius-emmanuel-b10279202/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* discover links */}
        <div>
          <h3 className="text-stone-200 text-xs font-black uppercase tracking-widest mb-4">
            Discover
          </h3>
          <ul className="space-y-3 text-xs md:text-sm font-semibold">
            <li>
              <Link
                to="/"
                className="hover:text-white transition text-stone-500"
              >
                Discover Movies
              </Link>
            </li>
            <li>
              <Link
                to="/trending"
                className="hover:text-white transition text-stone-500"
              >
                Trending Now
              </Link>
            </li>
            <li>
              <Link
                to="/genre/action"
                className="hover:text-white transition text-stone-500"
              >
                Browse Genres
              </Link>
            </li>
            <li>
              <Link
                to="/top-rated"
                className="hover:text-white transition text-stone-500"
              >
                Top Rated
              </Link>
            </li>
          </ul>
        </div>

        {/* AI discovery */}
        <div>
          <h3 className="text-stone-200 text-xs font-black uppercase tracking-widest mb-4">
            AI Features
          </h3>
          <ul className="space-y-3 text-xs md:text-sm font-semibold">
            <li>
              <Link
                to="/ai"
                className="hover:text-white transition text-stone-500"
              >
                AI Recommendations
              </Link>
            </li>
            <li>
              <Link
                to="/ai"
                className="hover:text-white transition text-stone-500"
              >
                Movie Concierge
              </Link>
            </li>
            <li>
              <Link
                to="/ai"
                className="hover:text-white transition text-stone-500"
              >
                Find by Mood
              </Link>
            </li>
          </ul>
        </div>

        {/* resources link */}
        <div>
          <h3 className="text-stone-200 text-xs font-black uppercase tracking-widest mb-4">
            Dashboard
          </h3>
          <ul className="space-y-3 text-xs md:text-sm font-semibold">
            <li>
              <Link
                to="/watchlist"
                className="hover:text-white transition text-stone-500"
              >
                My Watchlist
              </Link>
            </li>
            <li>
              <Link
                to="/trending"
                className="hover:text-white transition text-stone-500"
              >
                Movie Trailers
              </Link>
            </li>
            <li>
              <Link
                to="/discover"
                className="hover:text-white transition text-stone-500"
              >
                Search Engine
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-900/60 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-stone-600">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <p>© {new Date().getFullYear()} Movue. All rights reserved.</p>
            <span className="hidden md:inline text-stone-800">•</span>
            <p>
              Built by{" "}
              <a
                href="https://gaius-portfolio-kappa.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white underline underline-offset-4 decoration-stone-800 hover:decoration-white transition"
              >
                Gaius Emmanuel
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2 opacity-40 hover:opacity-70 transition duration-200">
            <span className="text-[10px] uppercase tracking-wider font-black">
              Data powered by
            </span>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short.svg"
              alt="TMDB Logo"
              className="h-3.5 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
