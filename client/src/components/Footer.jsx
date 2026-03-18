import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* brand */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Movue.
          </h2>

          <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            Discover movies like never before.  
            Movue helps you explore trending films, find streaming providers,
            and get AI-powered recommendations tailored to your taste.
          </p>

          <div className="flex gap-4 mt-5 text-sm">
            <a href="#" className="hover:text-yellow-400 transition">Twitter</a>
            <a href="#" className="hover:text-yellow-400 transition">GitHub</a>
            <a href="#" className="hover:text-yellow-400 transition">LinkedIn</a>
          </div>
        </div>

        {/* discover movies */}
        <div>
          <h3 className="text-white font-semibold mb-4">Discover</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Discover Movies
              </Link>
            </li>
            <li>
              <Link to="/trending" className="hover:text-yellow-400 transition">
                Trending
              </Link>
            </li>
            <li>
              <Link to="/genre/action" className="hover:text-yellow-400 transition">
                Browse Genres
              </Link>
            </li>
            <li>
              <Link to="/top-rated" className="hover:text-yellow-400 transition">
                Top Rated
              </Link>
            </li>
          </ul>
        </div>

        {/* AI features */}
        <div>
          <h3 className="text-white font-semibold mb-4">AI Discovery</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/ai" className="hover:text-yellow-400 transition">
                AI Recommendations
              </Link>
            </li>
            <li>
              <Link to="/ai" className="hover:text-yellow-400 transition">
                Movie Concierge
              </Link>
            </li>
            <li>
              <Link to="/ai" className="hover:text-yellow-400 transition">
                Find Movies by Mood
              </Link>
            </li>
          </ul>
        </div>

        {/* resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/watchlist" className="hover:text-yellow-400 transition">
                Watchlist
              </Link>
            </li>
            <li>
              <Link to="/trending" className="hover:text-yellow-400 transition">
                Movie Trailers
              </Link>
            </li>
            <li>
              <Link to="/discover" className="hover:text-yellow-400 transition">
                Search Movies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-white/10 py-6 px-6 text-center text-sm text-gray-500">

        <p>
          © {new Date().getFullYear()} Movue. All rights reserved.
        </p>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span>Powered by</span>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short.svg"
            alt="TMDB"
            className="h-5"
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;