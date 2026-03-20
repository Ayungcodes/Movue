import { useEffect, useState } from "react";
import { getLatestMovies } from "../services/moviesApi";

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState([]);
  const [current, setCurrent] = useState(0);
  //   const [query, setQuery] = useState([]);

  // fetch latest movies for slider
  useEffect(() => {
    getLatestMovies().then(({ data, error }) => {
      if (error) {
        setError("Couldn't load latest movies. Please try again.");
        return;
      }
      setMovies(data);
    });
  }, []);

  // auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length) return null;

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     if (!query.trim()) return;
  //     onSearch(query);
  //   };

  if (error) {
    <p className="text-red-400 text-center">{error}</p>;
  }

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {movies.map((movie, index) => (
        <img
          key={movie.id}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className={`
            absolute w-full h-full object-cover transition-opacity duration-1000
            ${index === current ? "opacity-100" : "opacity-0"}
          `}
          style={{ transitionTimingFunction: "ease-in-out" }}
        />
      ))}

      {/* overlay */}
      <div className="absolute w-full h-full bg-black/20 z-10" />

      {/* overlay content */}
      <div className="relative z-20 text-center text-white px-4 md:px-10">
        {/* <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Discover Movies Like Never Before
        </h1> */}

        {/* Search bar */}
        {/* <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-l-lg outline-none text-black"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg font-semibold"
          >
            Search
          </button>
        </form> */}

        {/* <p className="mt-4 text-sm md:text-base text-gray-300">
          Featuring:{" "}
          <span className="font-semibold">{movies[current].title}</span>
        </p> */}
      </div>
    </section>
  );
};

export default HeroSlider;
